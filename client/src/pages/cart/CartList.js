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

function createData(name, price, amount) {
  return { name, price, amount };
}

const rows = [
  createData("Margarita", 159, 3),
  createData("Hawaiian", 237, 2),
  createData("Veg Supreme", 262, 5),
  createData("Volcano", 305, 4),
];

export default function CartList() {
  const navigate = useNavigate();

  return (
    <>
      <Box display={"flex"} gap={4} flexDirection={"row"}>
        <Box flex={2}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Pizza</TableCell>
                  <TableCell align="right">Price (₱)</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right"></TableCell>
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
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">
                      <TextField
                        id="standard-basic"
                        defaultValue={row.amount}
                        variant="standard"
                        size="small"
                        type="number"
                        inputProps={{ min: 1, style: { textAlign: "center" } }}
                        sx={{ width: 50 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Remove from cart">
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
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
              <ListItemText primary="Total (12 items)" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: 20 }} color="text.primary">
                    ₱ 5231.00
                  </Typography>
                }
              />
            </ListItem>
          </List>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/checkout")}
          >
            Proceed To Checkout
          </Button>
        </Box>
      </Box>
    </>
  );
}
