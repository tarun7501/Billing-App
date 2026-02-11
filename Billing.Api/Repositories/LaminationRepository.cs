using Billing.Api.Contracts;
using Billing.Api.Domain.Entities;
using Billing.Api.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Billing.Api.Repositories
{
	public class LaminationRepository : ILaminationRepository
	{
		private readonly BillingDbContext _dbContext;

		public LaminationRepository(BillingDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<List<LaminationFinish>> GetLaminationFinishTypes()
		{
			return await _dbContext.LaminationFinishes.AsNoTracking().ToListAsync();
		}

		public async Task<List<LaminationType>> GetLaminationTypes()
		{
			return await _dbContext.LaminationTypes.AsNoTracking().ToListAsync();
		}
	}
}
