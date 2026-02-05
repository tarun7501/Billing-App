using Billing.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Billing.Api.Infrastructure.Data
{
    public class BillingDbContext : DbContext
    {
        public BillingDbContext(DbContextOptions<BillingDbContext> options)
        : base(options) { }

        public DbSet<Customer> Customers => Set<Customer>();
        public DbSet<PhotoService> PhotoServices => Set<PhotoService>();
        public DbSet<PhotoSize> PhotoSizes => Set<PhotoSize>();
        public DbSet<PhotoPricing> PhotoPricings => Set<PhotoPricing>();

        public DbSet<LaminationType> LaminationTypes => Set<LaminationType>();
        public DbSet<LaminationFinish> LaminationFinishes => Set<LaminationFinish>();
        public DbSet<LaminationFinishPrice> LaminationFinishPrices => Set<LaminationFinishPrice>();

        public DbSet<Bill> Bills => Set<Bill>();
        public DbSet<BillItem> BillItems => Set<BillItem>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
                .HasIndex(x => x.PhoneNumber)
                .IsUnique();

            modelBuilder.Entity<Bill>()
                .HasIndex(x => x.BillNumber)
                .IsUnique();

            modelBuilder.Entity<PhotoPricing>()
                .Property(x => x.BasePrice)
                .HasColumnType("numeric(10,2)");

            modelBuilder.Entity<PhotoPricing>()
                .Property(x => x.ExtraCopyPrice)
                .HasColumnType("numeric(10,2)");

            modelBuilder.Entity<LaminationFinishPrice>()
                .Property(x => x.ExtraPrice)
                .HasColumnType("numeric(10,2)");

            modelBuilder.Entity<BillItem>()
                .Property(x => x.UnitPrice)
                .HasColumnType("numeric(10,2)");

            modelBuilder.Entity<BillItem>()
                .Property(x => x.TotalPrice)
                .HasColumnType("numeric(10,2)");
        }
    }
}
