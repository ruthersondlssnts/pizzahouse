using Microsoft.AspNetCore.Mvc;
using PizzaHouse.Api.Models;
using PizzaHouse.Api.Models.DTOs;
using PizzaHouse.Api.Services.Interfaces;

namespace PizzaHouse.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;

        public OrdersController(
            IOrderRepository orderRepository,
            ICustomerRepository customerRepository,
            IOrderDetailRepository orderDetailRepository)
        {
            _orderRepository = orderRepository;
            _customerRepository = customerRepository;
            _orderDetailRepository = orderDetailRepository;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(CreateOrderDto orderDto)
        {
            // upsert Customer
            var customer = new Customer { Name = orderDto.Fullname };
            await _customerRepository.CreateAsync(customer);
            await _customerRepository.SaveChangesAsync();


            var order = new Order
            {
                CustomerId = customer.Id,
                ProductCount = orderDto.OrderDetails.Sum(o => o.Quantity),
                TotalCost = orderDto.OrderDetails.Sum(o => o.Quantity * o.Price),
            };
            await _orderRepository.CreateAsync(order);
            await _orderRepository.SaveChangesAsync();

            var orderDetails = new List<OrderDetail>();

            foreach (var item in orderDto.OrderDetails)
            {
                orderDetails.Add(new OrderDetail
                {
                    OrderId = order.Id,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity
                });
            }

            await _orderDetailRepository.CreateRangeAsync(orderDetails);
            await _orderRepository.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("Transactions")]
        public async Task<IActionResult> GetAllTransactions()
        {
            var orders = await _orderRepository.GetAllTransactionAsync();
            var transactions = new List<GetAllOrderTransactionsDto>();
            foreach (var item in orders)
            {
                var products = new List<GetOrderProductsDto>();
                foreach (var prod in item.OrderDetails)
                {
                    products.Add(new GetOrderProductsDto
                    {
                        Name = prod.Product.Name,
                        Price = prod.Product.Price,
                        Quantity = prod.Quantity
                    });
                }

                transactions.Add(new GetAllOrderTransactionsDto
                {
                    Customer = item.Customer.Name,
                    DateTime = item.OrderDate.ToShortDateString(),
                    Id = item.Id.ToString("D5"),
                    Total = item.TotalCost,
                    Orders = products
                });
            }

            return Ok(transactions);
        }
    }
}
