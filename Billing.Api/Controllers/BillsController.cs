using Billing.Api.Constants;
using Billing.Api.Domain.Entities;
using Billing.Api.Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Billing.Api.Controllers
{
    [Route("api/bills")]
    [ApiController]
    public class BillsController : ControllerBase
    {
        private readonly BillingDbContext _context;

        public BillsController(BillingDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateBillDto dto)
        {
            // 1️⃣ Customer (reuse by phone)
            var customer = await _context.Customers
                .FirstOrDefaultAsync(x => x.PhoneNumber == dto.Customer.PhoneNumber);

            if (customer == null)
            {
                customer = new Customer
                {
                    Name = dto.Customer.Name,
                    PhoneNumber = dto.Customer.PhoneNumber,
                    Email = dto.Customer.Email
                };
                _context.Customers.Add(customer);
            }

            // 2️⃣ Create Bill
            var bill = new Bill
            {
                BillNumber = GenerateBillNumber(),
                BillDate = dto.BillDate,
                Customer = customer,
                DiscountAmount = dto.DiscountAmount,
                AdvanceAmount = dto.AdvanceAmount
            };

            // 3️⃣ Items
            foreach (var item in dto.Items)
            {
                bill.Items.Add(new BillItem
                {
                    PhotoServiceId = item.PhotoServiceId,
                    PhotoSizeId = item.PhotoSizeId,
                    LaminationTypeId = item.LaminationTypeId,
                    LaminationFinishId = item.LaminationFinishId,
                    Quantity = item.Quantity,
                    UnitPrice = item.UnitPrice,
                    TotalPrice = item.Quantity * item.UnitPrice
                });
            }

            // 4️⃣ Totals
            bill.SubTotalAmount = bill.Items.Sum(x => x.TotalPrice);
            bill.TotalAmount = bill.SubTotalAmount - bill.DiscountAmount;
            bill.BalanceAmount = bill.TotalAmount - bill.AdvanceAmount;
            bill.IsCleared = bill.BalanceAmount <= 0;

            _context.Bills.Add(bill);
            await _context.SaveChangesAsync();  

            return Ok(bill.Id);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<BillDetailsDto>> Get(int id)
        {
            var bill = await _context.Bills
                .Include(b => b.Customer)
                .Include(b => b.Items)
                    .ThenInclude(i => i.PhotoService)
                .Include(b => b.Items)
                    .ThenInclude(i => i.PhotoSize)
                .Include(b => b.Items)
                    .ThenInclude(i => i.LaminationType)
                .Include(b => b.Items)
                    .ThenInclude(i => i.LaminationFinish)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (bill == null)
                return NotFound();

            var result = new BillDetailsDto
            {
                Id = bill.Id,
                BillNumber = bill.BillNumber,
                BillDate = bill.BillDate,
                Customer = new CustomerDto
                {
                    Name = bill.Customer.Name,
                    PhoneNumber = bill.Customer.PhoneNumber,
                    Email = bill.Customer.Email
                },
                SubTotalAmount = bill.SubTotalAmount,
                DiscountAmount = bill.DiscountAmount,
                TotalAmount = bill.TotalAmount,
                AdvanceAmount = bill.AdvanceAmount,
                BalanceAmount = bill.BalanceAmount,
                IsCleared = bill.IsCleared,
                Items = bill.Items.Select(i => new BillItemDto
                {
                    Id = i.Id,
                    PhotoServiceId = i.PhotoServiceId,
                    PhotoServiceName = i.PhotoService.Name,
                    PhotoSizeId = i.PhotoSizeId,
                    PhotoSizeLabel = i.PhotoSize.Label,
                    LaminationTypeId = i.LaminationTypeId,
                    LaminationTypeName = i.LaminationType?.Name,
                    LaminationFinishId = i.LaminationFinishId,
                    LaminationFinishName = i.LaminationFinish?.Name,
                    Quantity = i.Quantity,
                    UnitPrice = i.UnitPrice,
                    TotalPrice = i.TotalPrice
                }).ToList()
            };

            return Ok(result);
        }


        private string GenerateBillNumber()
            => $"BILL-{DateTime.UtcNow:yyyyMMddHHmmss}";
    }
}
