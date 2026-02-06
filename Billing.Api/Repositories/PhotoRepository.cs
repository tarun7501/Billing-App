using Billing.Api.Contracts;
using Billing.Api.Domain.Entities;
using Billing.Api.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Billing.Api.Repositories
{
	public class PhotoRepository : IPhotoRepository
	{
		private readonly BillingDbContext _dbContext;

		public PhotoRepository(BillingDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<List<PhotoService>> GetPhotoServicesAsync()
		{
			return await _dbContext.PhotoServices.AsNoTracking().ToListAsync();
		}

		public async Task<List<PhotoSize>> GetPhotoSizesAsync()
		{
			return await _dbContext.PhotoSizes.AsNoTracking().ToListAsync(); 
		}
	}
}
