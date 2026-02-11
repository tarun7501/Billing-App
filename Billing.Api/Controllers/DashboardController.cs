using Billing.Api.Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Billing.Api.Constants.Dashboard;

namespace Billing.Api.Controllers
{
	[Route("api/dashboard")]
	[ApiController]
	public class DashboardController : ControllerBase
	{
		private readonly BillingDbContext _context;

		public DashboardController(BillingDbContext context)
		{
			_context = context;
		}

		[HttpGet("summary")]
		public async Task<IActionResult> GetSummary()
		{
			var now = DateTime.Now;
			var currentMonth = now.Month;
			var currentYear = now.Year;
			var bills = await _context.Bills.ToListAsync();
			var monthlyBills = bills.Count(b => b.BillDate.Month == currentMonth && b.BillDate.Year == currentYear);
			var totalRevenue = bills.Sum(b => b.TotalAmount);
			var pendingAmount = bills
				.Where(b => b.IsCleared == false)
				.Sum(b => b.BalanceAmount);

			var revenueTrend = new List<MonthlyRevenueDto>();
			for (int i = 6; i >= 0; i--)
			{
				var date = now.AddMonths(-i);
				var monthRevenue = bills
					.Where(b => b.BillDate.Month == date.Month && b.BillDate.Year == date.Year)
					.Sum(b => b.TotalAmount);

				revenueTrend.Add(new MonthlyRevenueDto
				{
					Month = date.ToString("MMM"),
					Amount = monthRevenue
				});
			}

			var clearedCount = bills.Count(b => b.IsCleared == true);
			var pendingCount = bills.Count(b => b.IsCleared == false);

			var result = new DashboardSummaryDto
			{
				MonthlyBills = monthlyBills,
				TotalRevenue = totalRevenue,
				PendingAmount = pendingAmount,
				RevenueTrend = revenueTrend,
				StatusDistribution = new StatusDistributionDto
				{
					Cleared = clearedCount,
					Pending = pendingCount
				}
			};

			return Ok(result);
		}
	}
}
