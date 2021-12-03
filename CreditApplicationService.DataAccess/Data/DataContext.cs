using CreditApplicationService.Core.Domain;
using Microsoft.EntityFrameworkCore;

namespace CreditApplicationService.DataAccess.Data
{
    public class DataContext : DbContext
    {
        public virtual DbSet<Client> Clients { get; set; }

        public virtual DbSet<CreditApplication> CreditApplications { get; set; }


        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Client>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
                entity.Property(e => e.Birthday)
                    .IsRequired();
                entity.Property(e => e.Salary)
                    .IsRequired();
                
            });

            modelBuilder.Entity<CreditApplication>(entity =>
            {
                entity.Property(e => e.ClientId)
                    .IsRequired();
                entity.Property(e => e.AmountOfCredit)
                    .IsRequired();
                entity.Property(e => e.TermsInMonths)
                    .IsRequired();
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
