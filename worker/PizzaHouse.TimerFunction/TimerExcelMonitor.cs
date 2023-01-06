using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace PizzaHouse.TimerFunction
{
    public class Product
    {
        public string Name { get; set; }
        public int InStock { get; set; }
        public double Price { get; set; }
    }

    public class TimerExcelMonitor
    {
        public static byte[] _previousFile = null;

        [FunctionName("TimerExcelMonitor")]
        public async Task Run([TimerTrigger("*/15 * * * * *")] TimerInfo myTimer,
            [Blob("pizzahouse/products.xlsx", FileAccess.Read, Connection = "AzureWebJobsStorage")] Stream myBlob,
            ILogger log)
        {
            log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");


            //Compare if modified
            var products = new List<Product>();

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (ExcelPackage package = new ExcelPackage(myBlob))
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                var rowCount = worksheet.Dimension.Rows;

                for (int row = 2; row <= rowCount; row++)
                {
                    products.Add(new Product
                    {
                        Name = worksheet.Cells[row, 1].Value.ToString().Trim(),
                        Price = double.Parse(worksheet.Cells[row, 2].Value.ToString().Trim()),
                        InStock = int.Parse(worksheet.Cells[row, 2].Value.ToString().Trim())
                    });
                }
            }
        }


    }
}
