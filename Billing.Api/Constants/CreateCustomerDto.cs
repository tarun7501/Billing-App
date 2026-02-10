namespace Billing.Api.Constants
{
    public class CreateCustomerDto
    {
        public string Name { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string? Email { get; set; }
    }
}
