
namespace CreditApplicationService.Core.Domain
{
    public partial class CreditApplication
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public decimal AmountOfCredit { get; set; }
        public int TermsInMonths { get; set; }
        public Boolean Result { get; set; }
        public virtual Client Client { get; set; }
    }
}
