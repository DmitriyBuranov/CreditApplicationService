using CreditApplicationService.Core.Domain;
using CreditApplicationService.Models;

namespace CreditApplicationService.Mappers
{
    public class ClientMapper
    {

        public static Client MapFromModel(ClientDto request, Client? client = null)
        {
            if (client == null)
                client = new Client();

            client.Name = request.Name;
            client.Salary = request.Salary;
            client.Birthday = request.Birthday;
            client.Surname = request.Surname;
            client.CreatedAt = DateTime.UtcNow;

            return client;
        }
    }

}
