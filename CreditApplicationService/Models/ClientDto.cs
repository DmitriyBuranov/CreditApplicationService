namespace CreditApplicationService.Models
{
    public class ClientDto
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public DateTime Birthday { get; set; }
        public DateTime CreatedAt { get; set; }
        public decimal Salary { get; set; }
    }
}
