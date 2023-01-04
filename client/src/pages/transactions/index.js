import Container from "@mui/material/Container/Container";
import HeaderTitle from "../../components/Header";
import TransactionList from "./TransactionList";
function Inventory() {
  return (
    <Container maxWidth="md">
      <HeaderTitle title="Transaction History" />
      <TransactionList />
    </Container>
  );
}

export default Inventory;
