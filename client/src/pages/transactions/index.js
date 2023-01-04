import Container from "@mui/material/Container/Container";
import Typography from "@mui/material/Typography";
import TransactionList from "./TransactionList";
function Inventory() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        Transaction History
      </Typography>
      <TransactionList />
    </Container>
  );
}

export default Inventory;
