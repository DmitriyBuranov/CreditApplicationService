using CreditApplicationService.Core.Domain;

namespace CreditApplicationService.Services
{
    public class CreditApprovalService
    {

        public static bool ApproveCredit(CreditApplication creditApplication, Client client)
        {
            var monthlyPayment = creditApplication.AmountOfCredit / creditApplication.TermsInMonths;

            DateTime now = DateTime.UtcNow;
            int age = now.Year - client.Birthday.Year;
            if (client.Birthday > now.AddYears(-age)) age--;

            if (age < 61 && age > 20 && client.Salary > 25000 && (client.Salary- monthlyPayment) > client.Salary/2)
            return true;
            else return false;
        }

    }
}
