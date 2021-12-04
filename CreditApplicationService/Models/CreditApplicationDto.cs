namespace CreditApplicationService.Models
{
    public class CreditApplicationDto
    {
        public int ClientId { get; set; }
        public decimal AmountOfCredit { get; set; }
        public int TermsInMonths { get; set; }
    }
}
