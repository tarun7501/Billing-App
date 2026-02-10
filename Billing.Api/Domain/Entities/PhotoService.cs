namespace Billing.Api.Domain.Entities
{
    public class PhotoService
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
