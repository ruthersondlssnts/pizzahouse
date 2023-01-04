using PizzaHouse.Api.Models;

namespace PizzaHouse.Api.Services.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllAsync();
        Task<Product?> GetByIdAsync(int productId);
        Task<bool> SaveChangesAsync();

    }
}
