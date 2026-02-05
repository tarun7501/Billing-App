namespace Billing.Api.Domain.Entities
{
    public class PhotoPricing
    {
        public int Id { get; set; }

        public int PhotoServiceId { get; set; }
        public PhotoService PhotoService { get; set; } = null!;

        public int PhotoSizeId { get; set; }
        public PhotoSize PhotoSize { get; set; } = null!;

        public int MinimumCopies { get; set; }
        public decimal BasePrice { get; set; }
        public decimal ExtraCopyPrice { get; set; }

        public bool IsActive { get; set; } = true;
    }
}
