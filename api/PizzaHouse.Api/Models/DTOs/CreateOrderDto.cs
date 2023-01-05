namespace PizzaHouse.Api.Models.DTOs
{
    public class CreateOrderDto
    {
        public string Fullname { get; set; }
        public ICollection<CreateOrderDetailDto> OrderDetails { get; set; }
           = new List<CreateOrderDetailDto>();
    }
}
