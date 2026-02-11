namespace Billing.Api.Constants
{
    public class CustomerSummaryDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public int TotalBills { get; set; }
        public decimal TotalSpent { get; set; }
        public decimal PendingBalance { get; set; }
        public DateTime? LastBillDate { get; set; }
    }
}
