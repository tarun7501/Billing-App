using Billing.Api.Domain.Entities;

namespace Billing.Api.Contracts
{
    public interface ILaminationRepository
    {
        Task<List<LaminationType>> GetLaminationTypes();
        Task<List<LaminationFinish>> GetLaminationFinishTypes();
    }
}
