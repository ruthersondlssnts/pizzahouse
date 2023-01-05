using PizzaHouse.Api.Models;

namespace PizzaHouse.Api.Services.Interfaces
{
    public interface IOrderRepository
    {
        Task<bool> SaveChangesAsync();
        Task CreateAsync(Order order);
        Task<List<Order>> GetAllTransactionAsync();
    }
}
