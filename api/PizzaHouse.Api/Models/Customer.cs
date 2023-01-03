using System.ComponentModel.DataAnnotations;

namespace PizzaHouse.Api.Models;

public class Customer
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = null!;
}