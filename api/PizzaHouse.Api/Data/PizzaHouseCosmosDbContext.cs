using Microsoft.EntityFrameworkCore;
using PizzaHouse.Api.Models;

namespace PizzaHouse.Api.Data;
public class PizzaHouseCosmosDbContext : DbContext
{
    public DbSet<CustomerInformation> Customers { get; set; } = null!;

    public PizzaHouseCosmosDbContext(DbContextOptions<PizzaHouseCosmosDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CustomerInformation>().ToContainer("customers").HasPartitionKey(c => c.Id);
    }
}
