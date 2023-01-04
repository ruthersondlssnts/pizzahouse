import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import Alert from "@mui/material/Alert/Alert";
import TextField from "@mui/material/TextField/TextField";
import FormGroup from "@mui/material/FormGroup";

function createData(name, price, inStock) {
  return { name, price, inStock };
}

const rows = [
  createData("Margarita", 159, 23),
  createData("Hawaiian", 237, 43),
  createData("Veg Supreme", 262, 34),
  createData("Volcano", 305, 65),
];

export default function InventoryList() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>
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
                      label="Stock"
                      defaultValue={row.inStock}
                      variant="standard"
                      size="small"
                    />

                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleClick}
                      size="small"
                    >
                      Save
                    </Button>
                  </FormGroup>
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
