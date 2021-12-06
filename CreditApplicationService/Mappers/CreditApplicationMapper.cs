using CreditApplicationService.Core.Domain;
using CreditApplicationService.Models;

namespace CreditApplicationService.Mappers
{
    public class CreditApplicationMapper
    {

        public static CreditApplication MapFromModel(CreditApplicationDto request, CreditApplication? creditApplication = null)
        {
            if (creditApplication == null)
                creditApplication = new CreditApplication();

            creditApplication.ClientId = request.ClientId;
            creditApplication.AmountOfCredit = request.AmountOfCredit;
            creditApplication.TermsInMonths = request.TermsInMonths;
            creditApplication.CreatedAt = DateTime.UtcNow;

            return creditApplication;
        }
    }

}
