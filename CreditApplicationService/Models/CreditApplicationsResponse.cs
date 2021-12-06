using CreditApplicationService.Core.Domain;

namespace CreditApplicationService.Models
{
    public class CreditApplicationsResponse
    {
        public int ClientId { get; set; }
        public string Name { get; set; }
        public int CreditId { get; set; }
        public string Surname { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Result { get; set; }
    
    }
}
