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

        [HttpPut("IncrementProductStock/{productId}")]
        public async Task<ActionResult> IncrementProductStock(int productId)
        {
            var product = await _repository.GetByIdAsync(productId);

            if (product == null)
            {
                return NotFound();
            }

            product.InStock = product.InStock + 1;

            _repository.Update(product);

            await _repository.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("DecrementProductStock/{productId}")]
        public async Task<ActionResult> DecrementProductStock(int productId)
        {
            var product = await _repository.GetByIdAsync(productId);

            if (product == null)
            {
                return NotFound();
            }

            product.InStock = product.InStock - 1;

            _repository.Update(product);

            await _repository.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("AddProductStock/{productId}")]
        public async Task<ActionResult> AddProductStock(int productId, int returnStocks)
        {
            var product = await _repository.GetByIdAsync(productId);

            if (product == null)
            {
                return NotFound();
            }

            product.InStock = product.InStock + returnStocks;

            _repository.Update(product);

            await _repository.SaveChangesAsync();

            return NoContent();
        }
    }
}
