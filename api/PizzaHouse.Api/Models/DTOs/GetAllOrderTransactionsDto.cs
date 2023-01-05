namespace PizzaHouse.Api.Models.DTOs
{
    public class GetAllOrderTransactionsDto
    {
        public string Id { get; set; } = null!;
        public string DateTime { get; set; } = null!;
        public string Customer { get; set; } = null!;
        public double Total { get; set; }
        public List<GetOrderProductsDto> Orders { get; set; } = new List<GetOrderProductsDto>();
    }

    public class GetOrderProductsDto
    {
        public string Name { get; set; } = null!;
        public double Price { get; set; }
        public int Quantity { get; set; }
    }
}
