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
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

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

                entity.HasOne(d => d.Client)
                    .WithMany(p => p.CreditApplications)
                    .HasForeignKey(d => d.ClientId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
