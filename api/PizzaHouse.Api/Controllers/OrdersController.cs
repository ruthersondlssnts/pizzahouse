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
        private readonly IProductRepository _productRepository;

        public OrdersController(
            IOrderRepository orderRepository,
            ICustomerRepository customerRepository,
            IOrderDetailRepository orderDetailRepository,
            IProductRepository productRepository)
        {
            _orderRepository = orderRepository;
            _customerRepository = customerRepository;
            _orderDetailRepository = orderDetailRepository;
            _productRepository = productRepository;
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
    }
}
