namespace Billing.Api.Constants
{
    public class CreateBillDto
    {
        public CreateCustomerDto Customer { get; set; } = null!;
        public DateTime BillDate { get; set; }

        public decimal DiscountAmount { get; set; }
        public decimal AdvanceAmount { get; set; }

        public List<CreateBillItemDto> Items { get; set; } = new();
    }
}
