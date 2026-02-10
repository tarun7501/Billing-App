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

        public DbSet<LaminationType> LaminationTypes => Set<LaminationType>();
        public DbSet<LaminationFinish> LaminationFinishes => Set<LaminationFinish>();

        public DbSet<Bill> Bills => Set<Bill>();
        public DbSet<BillItem> BillItems => Set<BillItem>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Customer>()
                .HasIndex(x => x.PhoneNumber)
                .IsUnique();

            modelBuilder.Entity<Bill>()
                .HasIndex(x => x.BillNumber)
                .IsUnique();

            modelBuilder.Entity<Bill>()
                .HasMany(b => b.Items)
                .WithOne(i => i.Bill)
                .HasForeignKey(i => i.BillId);

            modelBuilder.Entity<BillItem>()
                .Property(x => x.UnitPrice)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<BillItem>()
                .Property(x => x.TotalPrice)
                .HasColumnType("decimal(18,2)");
        }
    }
}
