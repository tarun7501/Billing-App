namespace Billing.Api.Domain.Entities
{
	public class PhotoSize
	{
		public int Id { get; set; }
		public required string Label { get; set; }
		public bool IsActive { get; set; } = true;
	}
}
