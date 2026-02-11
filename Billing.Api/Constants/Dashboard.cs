namespace Billing.Api.Constants
{
    public class Dashboard
    {
        public class DashboardSummaryDto
        {
            public int MonthlyBills { get; set; }
            public decimal TotalRevenue { get; set; }
            public decimal PendingAmount { get; set; }
            public List<MonthlyRevenueDto>? RevenueTrend { get; set; }
            public StatusDistributionDto? StatusDistribution { get; set; }
        }

        public class MonthlyRevenueDto
        {
            public string? Month { get; set; }
            public decimal Amount { get; set; }
        }

        public class StatusDistributionDto
        {
            public int Cleared { get; set; }
            public int Pending { get; set; }
        }
    }
}
