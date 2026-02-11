namespace Billing.Api.Domain.Entities
{
	public class BillItem
	{
		public int Id { get; set; }
		public int BillId { get; set; }
		public Bill Bill { get; set; } = null!;
		public int PhotoServiceId { get; set; }
        public PhotoService PhotoService { get; set; } = null!;
		public int PhotoSizeId { get; set; }
		public PhotoSize PhotoSize { get; set; } = null!;
		public int? LaminationTypeId { get; set; }
		public LaminationType? LaminationType { get; set; }
		public int? LaminationFinishId { get; set; }
		public LaminationFinish? LaminationFinish { get; set; }
		public int Quantity { get; set; }
		public decimal UnitPrice { get; set; }
		public decimal TotalPrice { get; set; }
	}
}