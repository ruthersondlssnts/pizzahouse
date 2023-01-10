using PizzaHouse.Api.Data;
using PizzaHouse.Api.Models;
using PizzaHouse.Api.Services.Interfaces;

namespace PizzaHouse.Api.Services.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly PizzaHouseDbContext _context;
        private readonly PizzaHouseCosmosDbContext _contextCosmos;

        public CustomerRepository(PizzaHouseDbContext context, PizzaHouseCosmosDbContext contextCosmos)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _contextCosmos = contextCosmos ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task CreateAsync(Customer cust, CustomerInformation custInfo)
        {
            await _context.Customers.AddAsync(cust);
            await _contextCosmos.Customers.AddAsync(custInfo);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() >= 0;
        }

        public async Task<bool> SaveChangesCosmosAsync()
        {
            return await _contextCosmos.SaveChangesAsync() >= 0;
        }
    }
}
