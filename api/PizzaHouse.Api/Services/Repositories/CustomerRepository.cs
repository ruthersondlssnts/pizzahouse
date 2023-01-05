using PizzaHouse.Api.Data;
using PizzaHouse.Api.Models;
using PizzaHouse.Api.Services.Interfaces;

namespace PizzaHouse.Api.Services.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly PizzaHouseDbContext _context;

        public CustomerRepository(PizzaHouseDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task CreateAsync(Customer cust)
        {
            await _context.Customers.AddAsync(cust);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() >= 0;
        }
    }
}
