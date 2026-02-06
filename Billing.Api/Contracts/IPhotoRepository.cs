using Billing.Api.Domain.Entities;

namespace Billing.Api.Contracts
{
    public interface IPhotoRepository
    {
        Task<List<PhotoService>> GetPhotoServicesAsync();
        Task<List<PhotoSize>> GetPhotoSizesAsync();
    }
}
