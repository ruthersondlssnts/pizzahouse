using Microsoft.EntityFrameworkCore;
using PizzaHouse.Api.Data;
using PizzaHouse.Api.Models;
using PizzaHouse.Api.Services.Interfaces;

namespace PizzaHouse.Api.Services.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly PizzaHouseDbContext _context;

        public ProductRepository(PizzaHouseDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product?> GetByIdAsync(int productId)
        {
            return await _context.Products.Where(p => p.Id == productId).FirstOrDefaultAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() >= 0;
        }

        public void Update(Product product)
        {
            _context.Update(product);
        }


    }

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

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() >= 0;
        }
    }
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
