using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PizzaHouse.Api.Models;

public class Order
{
    [Key]
    public int Id { get; set; }
    [ForeignKey("CustomerId")]
    public virtual Customer Customer { get; set; } = null!;
    public int CustomerId { get; set; }
    public double TotalCost { get; set; }
    public int ProductCount { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.Now;

    [JsonIgnore]
    public ICollection<OrderDetail> OrderDetails { get; set; }
        = new List<OrderDetail>();
}
