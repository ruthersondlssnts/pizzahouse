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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>()
            .HasData(
           new Product
           {
               Id = 1,
               Name = "Margarita",
               InStock = 45,
               Price = 559
           },
           new Product
           {
               Id = 2,
               Name = "Hawaiian",
               InStock = 87,
               Price = 699
           },
           new Product
           {
               Id = 3,
               Name = "Veg Supreme",
               InStock = 76,
               Price = 799
           },
           new Product
           {
               Id = 4,
               Name = "Volcano",
               InStock = 35,
               Price = 925
           });

        base.OnModelCreating(modelBuilder);
    }
}
