using Billing.Api.Domain.Enums;

namespace Billing.Api.Domain.Entities
{
    public class Bill
    {
        public int Id { get; set; }
        public required string BillNumber { get; set; }
        public DateTime BillDate { get; set; } = DateTime.UtcNow;
        public int CustomerId { get; set; }
        public Customer Customer { get; set; } = null!;
        public decimal SubTotalAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal AdvanceAmount { get; set; }
        public decimal BalanceAmount { get; set; }
        public bool IsCleared { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
        public ICollection<BillItem> Items { get; set; } = new List<BillItem>();
    }
}