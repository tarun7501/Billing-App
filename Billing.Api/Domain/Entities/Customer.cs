namespace Billing.Api.Domain.Entities
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string? Email { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

        public ICollection<Bill> Bills { get; set; }
    }
}
