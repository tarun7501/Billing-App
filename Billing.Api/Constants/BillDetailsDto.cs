namespace Billing.Api.Constants
{
    public class BillDetailsDto
    {
        public int Id { get; set; }
        public string BillNumber { get; set; } = null!;
        public DateTime BillDate { get; set; }
        public CustomerDto Customer { get; set; } = null!;
        public decimal SubTotalAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal AdvanceAmount { get; set; }
        public decimal BalanceAmount { get; set; }
        public bool IsCleared { get; set; }
        public List<BillItemDto> Items { get; set; } = new();
    }
}
