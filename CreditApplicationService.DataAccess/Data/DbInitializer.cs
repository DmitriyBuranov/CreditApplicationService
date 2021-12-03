using CreditApplicationService.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditApplicationService.DataAccess.Data
{
    public class DbInitializer : IDbInitializer
    {
        private readonly DataContext context;

        public DbInitializer(DataContext dataContext)
        {
            context = dataContext;
        }

        public void InitializeDb()
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            if (context.Clients.Any())
            {
                return;
            }

            context.Clients.AddRange(
                new Client
                {
                    Name = "Bob",
                    Surname = "Adams",
                    Birthday = new DateTime(2001, 3, 21),
                    Salary = 29000,
                    CreatedAt = DateTime.UtcNow,
                },

                new Client
                {
                    Name = "Sten",
                    Surname = "Brant",
                    Birthday = new DateTime(1991, 3, 21),
                    Salary = 27000,
                    CreatedAt = DateTime.UtcNow,
                },

                new Client
                {
                    Name = "John",
                    Surname = "Lee",
                    Birthday = new DateTime(1990, 3, 21),
                    Salary = 20000,
                    CreatedAt = DateTime.UtcNow,
                }
            );
        }





    }
}
