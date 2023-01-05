import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const PRODUCT_API_URL = API_URL + "products";

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
