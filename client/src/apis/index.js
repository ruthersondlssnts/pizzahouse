import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const PRODUCT_API_URL = API_URL + "products";
const ORDER_API_URL = API_URL + "orders";

export function getProductsApi() {
  return axios.get(PRODUCT_API_URL);
}

export function patchProductStockApi(id, inStock) {
  return axios.patch(
    PRODUCT_API_URL + "/" + id,
    [
      {
        value: inStock,
        path: "/inStock",
        op: "replace",
      },
    ],
    {
      headers: { "Content-type": "application/json-patch+json" },
    }
  );
}

export function updateDecrementProductStockApi(id) {
  return axios.put(PRODUCT_API_URL + "/DecrementProductStock/" + id);
}

export function updateIncrementProductStockApi(id) {
  return axios.put(PRODUCT_API_URL + "/IncrementProductStock/" + id);
}

export function updateAddProductStockApi(id, stock) {
  return axios.put(
    PRODUCT_API_URL + "/AddProductStock/" + id + "?returnStocks=" + stock
  );
}

export function saveOrder(data) {
  return axios.post(ORDER_API_URL, data);
}

export function getOrderTransactions() {
  return axios.get(ORDER_API_URL + "/Transactions");
}

export function sendOrderEmailToAdmin(data) {
  return axios.post("https://prod-07.southeastasia.logic.azure.com:443/workflows/bb5c73e2f4974cdf801c9cc3bed4109e/"+
    "triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=i_pxDVakCRMhmCSE90Yte0LFeh4JRNb20T-b-KZgXFY",
    data
  );
}