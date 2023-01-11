using Azure.Extensions.AspNetCore.Configuration.Secrets;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.EntityFrameworkCore;
using PizzaHouse.Api.Data;
using PizzaHouse.Api.Services.Interfaces;
using PizzaHouse.Api.Services.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy", builder =>
    {
        builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithExposedHeaders("X-Pagination");
    });
});


//#if !DEBUG
var kevUrl = builder.Configuration["KeyVaultUrl"];

var client = new SecretClient(new Uri(kevUrl!), new DefaultAzureCredential());

builder.Configuration.AddAzureKeyVault(client, new AzureKeyVaultConfigurationOptions());
//#endif


builder.Services.AddDbContext<PizzaHouseDbContext>(
     dbContextOptions => dbContextOptions.UseSqlServer(
        builder.Configuration["ConnectionStrings:PizzaHouseConnection"]));

builder.Services.AddDbContext<PizzaHouseCosmosDbContext>(
     dbContextOptions => dbContextOptions.UseCosmos(
        accountEndpoint: builder.Configuration["Cosmos:AccountEndpoint"]!,
        accountKey: builder.Configuration["Cosmos:AccountKey"]!,
        databaseName: builder.Configuration["Cosmos:DatabaseName"]!));

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IOrderDetailRepository, OrderDetailRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();

builder.Services.AddControllers().AddNewtonsoftJson();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen().AddSwaggerGenNewtonsoftSupport();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
app.UseSwaggerUI();
//}

app.UseCors("CORSPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
