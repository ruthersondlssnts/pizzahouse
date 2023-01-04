import Container from "@mui/material/Container/Container";
import HeaderTitle from "../../components/Header";
import CartList from "./CartList";
function Cart() {
  return (
    <Container maxWidth="md">
      <HeaderTitle title="Shopping Cart" />
      <CartList />
    </Container>
  );
}

export default Cart;
