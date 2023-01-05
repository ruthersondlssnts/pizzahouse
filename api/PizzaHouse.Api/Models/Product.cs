using System.ComponentModel.DataAnnotations;

namespace PizzaHouse.Api.Models;
public class Product
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public int InStock { get; set; }
    public double Price { get; set; }
}
