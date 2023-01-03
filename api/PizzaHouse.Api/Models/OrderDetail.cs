using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PizzaHouse.Api.Models;

public class OrderDetail //Cart
{
    [Key]
    public int Id { get; set; }
    [ForeignKey("ProductId")]
    public virtual Product Product { get; set; } = null!;
    [ForeignKey("OrderId")]
    public virtual Order Order { get; set; } = null!;
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}
