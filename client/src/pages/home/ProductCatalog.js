import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import Alert from "@mui/material/Alert/Alert";
import {
  getProductsApi,
  patchDecrementProductStockApi,
  updateDecrementProductStockApi,
} from "../../apis";

export default function ProductCatalog() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProductsApi().then((res) => setProducts(res.data));
  }, []);

  const handleAddToCart = (product) => {
    updateDecrementProductStockApi(product.id).then((res) => {
      //add item cart to local storage or update quantity
      let cartItems = JSON.parse(localStorage.getItem("cart"));
      cartItems = cartItems ?? [];

      let cartItemIndex = cartItems.findIndex(
        (p) => p.productId === product.id
      );

      let item = {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: cartItems[cartItemIndex]
          ? cartItems[cartItemIndex].quantity + 1
          : 1,
      };

      if (cartItemIndex > -1) cartItems[cartItemIndex] = item;
      else cartItems.push(item);

      localStorage.setItem("cart", JSON.stringify(cartItems));
      setOpen(true);
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Container maxWidth="md">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Pizza</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products &&
                products.map((product) => (
                  <TableRow
                    key={product.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {product.name}
                    </TableCell>
                    <TableCell align="right">₱ {product.price}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.inStock > 0 ? false : true}
                      >
                        {product.inStock > 0 ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Added to cart successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
