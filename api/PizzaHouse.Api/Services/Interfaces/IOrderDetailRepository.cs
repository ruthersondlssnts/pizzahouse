using PizzaHouse.Api.Models;

namespace PizzaHouse.Api.Services.Interfaces
{
    public interface IOrderDetailRepository
    {
        Task<bool> SaveChangesAsync();
        Task CreateRangeAsync(List<OrderDetail> orderDetails);
    }
}
