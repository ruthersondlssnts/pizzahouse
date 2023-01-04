import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import Alert from "@mui/material/Alert/Alert";
import TextField from "@mui/material/TextField/TextField";
import FormGroup from "@mui/material/FormGroup";
import { getProductsApi, patchProductStockApi } from "../../apis";

function StockForm({ product, setOpen }) {
  const textField = useRef();
  const handleUpdateProductStock = (id) => {
    patchProductStockApi(id, textField.current.value).then(() => {
      setOpen(true);
    });
  };
  return (
    <FormGroup
      row
      sx={{
        alignItems: "end",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <TextField
        id="standard-basic"
        defaultValue={product.inStock}
        variant="standard"
        size="small"
        inputRef={textField}
        type="number"
        sx={{ width: 100 }}
        inputProps={{ min: 0, style: { textAlign: "center" } }}
      />

      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleUpdateProductStock(product.id)}
        size="small"
      >
        Save
      </Button>
    </FormGroup>
  );
}

export default function InventoryList() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProductsApi().then((res) => setProducts(res.data));
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Pizza</TableCell>
              <TableCell>Price (₱)</TableCell>
              <TableCell align="center">Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <StockForm product={product} setOpen={setOpen} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
