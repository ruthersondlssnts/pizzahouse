using PizzaHouse.Api.Models;

namespace PizzaHouse.Api.Services.Interfaces
{
    public interface ICustomerRepository
    {
        Task<bool> SaveChangesAsync();
        Task CreateAsync(Customer cust, CustomerInformation custInfo);
        Task<bool> SaveChangesCosmosAsync();

    }
}
