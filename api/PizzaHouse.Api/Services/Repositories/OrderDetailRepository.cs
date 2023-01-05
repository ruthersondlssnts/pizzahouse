using PizzaHouse.Api.Data;
using PizzaHouse.Api.Models;
using PizzaHouse.Api.Services.Interfaces;

namespace PizzaHouse.Api.Services.Repositories
{
    public class OrderDetailRepository : IOrderDetailRepository
    {
        private readonly PizzaHouseDbContext _context;

        public OrderDetailRepository(PizzaHouseDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task CreateRangeAsync(List<OrderDetail> orderDetails)
        {
            await _context.AddRangeAsync(orderDetails);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() >= 0;
        }
    }
}
