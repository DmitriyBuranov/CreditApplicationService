
namespace CreditApplicationService.Core.Domain
{
    public partial class Client
    {

        public Client()
        {
            CreditApplications = new HashSet<CreditApplication>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public DateTime Birthday { get; set; }
        public DateTime CreatedAt { get; set; }
        public decimal Salary { get; set; }
        public virtual ICollection<CreditApplication> CreditApplications { get; set; }
    }
}
