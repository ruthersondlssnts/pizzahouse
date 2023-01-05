namespace PizzaHouse.Api.Models.DTOs
{
    public class CreateOrderDetailDto //Cart
    {
        public int ProductId { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
    }
}
