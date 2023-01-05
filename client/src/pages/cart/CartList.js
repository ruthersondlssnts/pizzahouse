import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  updateAddProductStockApi,
  updateDecrementProductStockApi,
  updateIncrementProductStockApi,
} from "../../apis";

function CartItem({ product, setCartItems }) {
  const [quantity, setQuantity] = useState(product.quantity);
  const handleQuantityChange = (isAdd) => {
    if (quantity === 1 && !isAdd) return;

    let apiUpdateStockCall = null;
    if (isAdd) {
      apiUpdateStockCall = updateDecrementProductStockApi(product.productId);
    } else {
      apiUpdateStockCall = updateIncrementProductStockApi(product.productId);
    }

    apiUpdateStockCall.then(() => {
      let cartItems = JSON.parse(localStorage.getItem("cart"));
      let cartItemIndex = cartItems.findIndex(
        (p) => p.productId === product.productId
      );

      let item = {
        productId: product.productId,
        name: product.name,
        price: product.price,
        quantity: isAdd ? quantity + 1 : quantity - 1,
      };
      cartItems[cartItemIndex] = item;
      localStorage.setItem("cart", JSON.stringify(cartItems));
      setCartItems(cartItems);
      setQuantity(isAdd ? quantity + 1 : quantity - 1);
    });
  };

  const handleRemove = () => {
    updateAddProductStockApi(product.productId, quantity).then(() => {
      let cartItems = JSON.parse(localStorage.getItem("cart"));
      let cartItemIndex = cartItems.findIndex(
        (p) => p.productId === product.productId
      );

      cartItems.splice(cartItemIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      setCartItems(cartItems);
    });
  };

  return (
    <TableRow
      key={product.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {product.name}
      </TableCell>
      <TableCell align="center">{product.price}</TableCell>
      <TableCell align="right">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={() => handleQuantityChange(false)}>
            <RemoveCircleIcon />
          </IconButton>
          <TextField
            id="standard-basic"
            value={quantity}
            variant="standard"
            size="small"
            inputProps={{
              readOnly: true,
              style: { textAlign: "center" },
            }}
            sx={{ width: 50 }}
          />
          <IconButton onClick={() => handleQuantityChange(true)}>
            <AddCircleIcon />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell align="right">
        <Tooltip title="Remove from cart">
          <IconButton onClick={handleRemove}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

export default function CartList() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );

  return (
    <>
      <Box display={"flex"} gap={4} flexDirection={"row"}>
        <Box flex={2}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Pizza</TableCell>
                  <TableCell align="center">Price (₱)</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems &&
                  cartItems.map((item) => (
                    <CartItem
                      key={item.productId}
                      product={item}
                      setCartItems={setCartItems}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box flex={1}>
          <Typography variant="h6" gutterBottom component="div">
            Order summary
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary={`Total (${
                  cartItems?.reduce(
                    (total, current) => current.quantity + total,
                    0
                  ) ?? 0
                } items)`}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: 20 }} color="text.primary">
                    ₱{" "}
                    {cartItems?.reduce(
                      (total, current) =>
                        current.quantity * current.price + total,
                      0
                    ) ?? 0}
                  </Typography>
                }
              />
            </ListItem>
          </List>
          {cartItems && cartItems.length > 0 && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/checkout")}
            >
              Proceed To Checkout
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}
