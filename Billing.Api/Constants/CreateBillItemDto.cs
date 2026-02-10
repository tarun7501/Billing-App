namespace Billing.Api.Constants
{
    public class CreateBillItemDto
    {
        public int PhotoServiceId { get; set; }
        public int PhotoSizeId { get; set; }

        public int? LaminationTypeId { get; set; }
        public int? LaminationFinishId { get; set; }

        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }
}
