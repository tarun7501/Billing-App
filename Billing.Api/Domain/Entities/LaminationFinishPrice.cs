namespace Billing.Api.Domain.Entities
{
	public class LaminationFinishPrice
	{
		public int Id { get; set; }

		public int PhotoSizeId { get; set; }
		public PhotoSize PhotoSize { get; set; } = null!;

		public int LaminationFinishId { get; set; }
		public LaminationFinish LaminationFinish { get; set; } = null!;

		public decimal ExtraPrice { get; set; }
	}
}
