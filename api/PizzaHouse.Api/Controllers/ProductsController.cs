using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using PizzaHouse.Api.Models;
using PizzaHouse.Api.Services.Interfaces;

namespace PizzaHouse.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repository;

        public ProductsController(IProductRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _repository.GetAllAsync();
            return Ok(products);
        }

        [HttpPatch("{productId}")]
        public async Task<ActionResult> PartiallyUpdateProduct(
           int productId,
           JsonPatchDocument<Product> productUpdates)
        {
            var product = await _repository.GetByIdAsync(productId);

            if (product == null)
            {
                return NotFound();
            }

            productUpdates.ApplyTo(product);

            await _repository.SaveChangesAsync();

            return NoContent();
        }
    }
}
