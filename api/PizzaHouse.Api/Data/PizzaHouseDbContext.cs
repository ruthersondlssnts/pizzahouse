using Microsoft.EntityFrameworkCore;
using PizzaHouse.Api.Models;

namespace PizzaHouse.Api.Data;
public class PizzaHouseDbContext : DbContext
{
    public DbSet<Customer> Customers { get; set; } = null!;
    public DbSet<Order> Orders { get; set; } = null!;
    public DbSet<OrderDetail> OrderDetails { get; set; } = null!;
    public DbSet<Product> Products { get; set; } = null!;

    public PizzaHouseDbContext(DbContextOptions<PizzaHouseDbContext> options)
        : base(options)
    {

    }

}
