namespace Billing.Api.Constants
{
    public class BillItemDto
    {
        public int Id { get; set; }
        public int PhotoServiceId { get; set; }
        public string PhotoServiceName { get; set; } = null!;

        public int PhotoSizeId { get; set; }
        public string PhotoSizeLabel { get; set; } = null!;

        public int? LaminationTypeId { get; set; }
        public string? LaminationTypeName { get; set; }

        public int? LaminationFinishId { get; set; }
        public string? LaminationFinishName { get; set; }

        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
