
namespace CreditApplicationService.Core.Domain
{
    public partial class Client
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime Birthday { get; set; }
        public DateTime CreatedAt { get; set; }
        public decimal Salary { get; set; }
    }
}
