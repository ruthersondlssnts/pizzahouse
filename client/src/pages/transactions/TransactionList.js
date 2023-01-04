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
import { useState } from "react";

function createData(orderNo, dateTime, customer, total) {
  return {
    orderNo,
    dateTime,
    customer,
    total,
    orders: [
      {
        pizza: "Hawaian",
        prize: "650",
        amount: 3,
      },
      {
        pizza: "Volcano",
        prize: "950",
        amount: 5,
      },
    ],
  };
}

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
          #{row.orderNo}
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
                    <TableCell>Price ($)</TableCell>
                    <TableCell>Total ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orders.map((order) => (
                    <TableRow key={order.pizza}>
                      <TableCell>{order.pizza}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>{order.prize}</TableCell>
                      <TableCell>{order.amount * order.prize}</TableCell>
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

const rows = [
  createData("0000121", "2022-10-10", "Lebron James", 6001.0),
  createData("0000122", "2023-12-11", "Kevin Durant", 3910.0),
  createData("0000123", "2021-03-06", "Kyrie Irving", 4610.0),
  createData("0000124", "2019-02-05", "Michael Jordan", 6100.0),
  createData("0000125", "2013-08-07", "Steph Curry", 5600.0),
];

export default function TransactionList() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order #</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Total price (₱)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.dateTime} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
