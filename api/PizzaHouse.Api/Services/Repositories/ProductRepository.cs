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
    }
}
