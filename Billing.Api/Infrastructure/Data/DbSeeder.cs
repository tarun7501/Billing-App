using Billing.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Billing.Api.Infrastructure.Data
{
	public class DbSeeder
	{
		public static async Task SeedAsync(BillingDbContext context)
		{
			// PHOTO SERVICES
			var services = new[]
			{
				"Mobile Photo",
				"Studio Photo",
				"Photo With Lamination"
			};

			if (!context.PhotoServices.Any())
			{
				context.PhotoServices.AddRange(
					services.Select(s => new PhotoService { Name = s })
				);
				await context.SaveChangesAsync();
			}
			
			// PHOTO SIZES
			var sizes = new[]
			{
				"4x6",
				"5x7",
				"6x9",
				"8x12",
				"10x15",
				"12x18",
				"10x24",
				"20x24",
				"20x30",
				"20x40",
				"24x24",
				"24x30",
				"24x36",
				"24x40"
			};

			if (!context.PhotoSizes.Any())
			{
				context.PhotoSizes.AddRange(
					sizes.Select(s => new PhotoSize { Label = s })
				);
				await context.SaveChangesAsync();
			}

			// LAMINATION TYPES
			var laminationTypes = new[] { "Bit", "Frame" };

			if (!context.LaminationTypes.Any())
			{
				context.LaminationTypes.AddRange(
					laminationTypes.Select(t => new LaminationType { Name = t })
				);
				await context.SaveChangesAsync();
			}
		
			// LAMINATION FINISHES
			var laminationFinishes = new[]
			{
				"Matte",
				"Glossy",
				"Glitter",
				"3D"
			};

			if (!context.LaminationFinishes.Any())
			{
				context.LaminationFinishes.AddRange(
					laminationFinishes.Select(f => new LaminationFinish { Name = f })
				);
				await context.SaveChangesAsync();
			}
		}
	}
}
