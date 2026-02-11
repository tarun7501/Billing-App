namespace Billing.Api.Constants
{
    public class CustomerBillsResponseDto
    {
        public CustomerSummaryDto? Customer { get; set; }
        public List<CustomerBillDto>? Bills { get; set; }
    }

    public class CustomerBillDto
    {
        public int Id { get; set; }
        public string? BillNumber { get; set; }
        public DateTime Date { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal AdvanceAmount { get; set; }
        public decimal BalanceAmount { get; set; }
        public string? Status { get; set; }
    }
}
