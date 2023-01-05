using Microsoft.EntityFrameworkCore;
using PizzaHouse.Api.Data;
using PizzaHouse.Api.Models;
using PizzaHouse.Api.Services.Interfaces;

namespace PizzaHouse.Api.Services.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly PizzaHouseDbContext _context;

        public OrderRepository(PizzaHouseDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task CreateAsync(Order order)
        {
            await _context.Orders.AddAsync(order);
        }

        public async Task<List<Order>> GetAllTransactionAsync()
        {
            return await _context.Orders.Include(x => x.Customer).Include(x => x.OrderDetails).ThenInclude(x => x.Product).ToListAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() >= 0;
        }
    }
}
