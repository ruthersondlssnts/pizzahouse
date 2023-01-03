using System.ComponentModel.DataAnnotations;

namespace PizzaHouse.Api.Models;

public class Order
{
    [Key]
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public decimal TotalCost { get; set; }
    public int ProductCount { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.Now;

    public ICollection<OrderDetail> OrderDetails { get; set; }
            = new List<OrderDetail>();
}
