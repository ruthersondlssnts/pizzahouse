using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Z.BulkOperations;

namespace PizzaHouse.TimerFunction;
public class Product
{
    public string Name { get; set; }
    public int InStock { get; set; }
    public double Price { get; set; }
}

public class TimerExcelMonitor
{
    public static byte[] _previousFile = null; //can move to database


    [FunctionName("TimerExcelMonitor")]
    public async Task Run([TimerTrigger("*/15 * * * * *")] TimerInfo myTimer,
        [Blob("pizzahouse/products.xlsx", FileAccess.Read, Connection = "AzureWebJobsStorage")] Stream excelProducts,
        ILogger log)
    {
        log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");

        if (IsModified(excelProducts))
        {
            List<Product> products = ConvertToProducts(excelProducts);

            BatchUpsert(products);
            log.LogInformation($"-------------------------------------------UPSERT!----------------------------------------------");
        }
        else
            log.LogInformation($"----------------------------------File is not modified!-------------------------------------------");

    }

    public void BatchUpsert(List<Product> products)
    {
        using (SqlConnection con = new SqlConnection(Environment.GetEnvironmentVariable("PizzaHouseConnection")))
        {
            try
            {
                con.Open();
                var bulk = new BulkOperation<Product>(con);
                bulk.DestinationTableName = "Products";
                bulk.AutoMapKeyExpression = c => c.Name;
                bulk.IgnoreOnMergeUpdateExpression = c => new { c.InStock };
                bulk.BulkMerge(products);
            }
            finally
            {
                con.Close();
            }
        }
    }

    bool IsModified(Stream file)
    {
        var memoryStream = new MemoryStream();
        file.CopyTo(memoryStream);
        byte[] byteArray = memoryStream.ToArray();
        if (_previousFile == null)
        {
            _previousFile = byteArray;
            return true;
        }
        else
        {
            var isModified = !_previousFile.SequenceEqual(byteArray);
            if (isModified)
            {
                _previousFile = byteArray;
            }
            return isModified;
        }
    }

    List<Product> ConvertToProducts(Stream file)
    {
        ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
        var products = new List<Product>();

        using (ExcelPackage package = new ExcelPackage(file))
        {
            ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
            var rowCount = worksheet.Dimension.Rows;

            for (int row = 2; row <= rowCount; row++)
            {
                products.Add(new Product
                {
                    Name = worksheet.Cells[row, 1].Value.ToString().Trim(),
                    Price = double.Parse(worksheet.Cells[row, 2].Value.ToString().Trim()),
                    InStock = int.Parse(worksheet.Cells[row, 3].Value.ToString().Trim())
                });
            }
        }
        return products;
    }

}
