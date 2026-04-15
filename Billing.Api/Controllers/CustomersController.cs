using Billing.Api.Constants;
using Billing.Api.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Billing.Api.Controllers
{
	[Route("api/customers")]
	[ApiController]
	public class CustomersController : ControllerBase
	{
		private readonly BillingDbContext _context;

		public CustomersController(BillingDbContext context)
		{
			_context = context;
		}

		[HttpGet("summary")]
		public async Task<IActionResult> GetCustomerSummaries(int pageNumber = 1, int pageSize = 10, string search = "")
		{
            var query = _context.Customers.Include(c => c.Bills).AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                search = search.ToLower();

                query = query.Where(c =>
                    c.Name.ToLower().Contains(search) ||
                    c.PhoneNumber.Contains(search) ||
                    (c.Email != null && c.Email.ToLower().Contains(search))
                );
            }

            var totalCount = await query.CountAsync();

            var customers = await query
                .OrderByDescending(c => c.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(c => new CustomerSummaryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Phone = c.PhoneNumber,
                    Email = c.Email,
                    TotalBills = c.Bills.Count(),
                    TotalSpent = c.Bills.Sum(b => (decimal?)b.TotalAmount) ?? 0,
                    PendingBalance = c.Bills.Sum(b => (decimal?)b.BalanceAmount) ?? 0,
                    LastBillDate = c.Bills
                        .OrderByDescending(b => b.BillDate)
                        .Select(b => (DateTime?)b.BillDate)
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(new
            {
                data = customers,
                totalCount
            });
        }

		[HttpGet("{id}/bills")]
		public async Task<IActionResult> GetCustomerBills(int id)
		{
			var customer = await _context.Customers
				.Include(c => c.Bills)
				.FirstOrDefaultAsync(c => c.Id == id);

			if (customer == null)
				return NotFound();

			var response = new CustomerBillsResponseDto
			{
				Customer = new CustomerSummaryDto
				{
					Id = customer.Id,
					Name = customer.Name,
					Phone = customer.PhoneNumber,
					Email = customer.Email,
					TotalBills = customer.Bills.Count,
					TotalSpent = customer.Bills.Sum(b => b.TotalAmount),
					PendingBalance = customer.Bills.Sum(b => b.BalanceAmount),
					LastBillDate = customer.Bills
						.OrderByDescending(b => b.BillDate)
						.Select(b => (DateTime?)b.BillDate)
						.FirstOrDefault()
				},

				Bills = customer.Bills
					.OrderByDescending(b => b.BillDate)
					.Select(b => new CustomerBillDto
					{
						Id = b.Id,
						BillNumber = b.BillNumber,
						Date = b.BillDate,
						TotalAmount = b.TotalAmount,
						AdvanceAmount = b.AdvanceAmount,
						BalanceAmount = b.BalanceAmount,
						Status = b.BalanceAmount == 0 ? "Cleared" : "Pending"
					}).ToList()
			};

			return Ok(response);
		}

        [HttpGet("totals")]
        public async Task<IActionResult> GetCustomerTotals()
        {
            var customers = await _context.Customers
                .Include(c => c.Bills)
                .ToListAsync();

            var totalCustomers = customers.Count;

            var totalBills = customers.Sum(c => c.Bills.Count);

            var totalPending = customers.Sum(c =>
                c.Bills.Sum(b => b.BalanceAmount)
            );

            return Ok(new
            {
                totalCustomers,
                totalBills,
                totalPending
            });
        }
    }
}
