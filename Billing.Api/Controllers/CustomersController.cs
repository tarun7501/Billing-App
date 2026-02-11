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
		public async Task<IActionResult> GetCustomerSummaries()
		{
			var customers = await _context.Customers
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
					}).ToListAsync();

			return Ok(customers);
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
	}
}
