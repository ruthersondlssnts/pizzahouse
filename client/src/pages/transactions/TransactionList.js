import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import { getOrderTransactions } from "../../apis";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          #{row.id}
        </TableCell>
        <TableCell>{row.dateTime}</TableCell>
        <TableCell>{row.customer}</TableCell>
        <TableCell>{row.total}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Orders
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Pizza</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Price (₱)</TableCell>
                    <TableCell>Total (₱)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orders.map((order) => (
                    <TableRow key={order.name}>
                      <TableCell>{order.name}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.price}</TableCell>
                      <TableCell>{order.quantity * order.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState(null);
  useEffect(() => {
    getOrderTransactions().then((res) => setTransactions(res.data));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order #</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Total (₱)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions &&
            transactions.map((trans) => (
              <Row key={trans.dateTime} row={trans} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
