namespace PizzaHouse.Api.Models;
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public int InStock { get; set; }
    public decimal Price { get; set; }
}

public class Order
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public decimal TotalCost { get; set; }
    public int ProductCount { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.Now;
}

public class OrderDetails //Cart
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}

public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
}