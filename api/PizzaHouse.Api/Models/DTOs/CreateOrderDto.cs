namespace PizzaHouse.Api.Models.DTOs
{
    public class CreateOrderDto
    {
        public string Fullname { get; set; } = null!;
        public CustomerInformation CustomerInformation { get; set; } = null!;

        public ICollection<CreateOrderDetailDto> OrderDetails { get; set; }
           = new List<CreateOrderDetailDto>();
    }
}
