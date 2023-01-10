namespace PizzaHouse.Api.Models;
public class CustomerInformation
{
    public string? Id { get; set; } = Guid.NewGuid().ToString();
    public string? Name { get; set; }
    public string? FullAddress { get; set; }
    public string? PhoneNumber { get; set; }
    public string? EmailAddress { get; set; }
}
