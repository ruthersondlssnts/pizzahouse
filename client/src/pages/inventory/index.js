import Container from "@mui/material/Container/Container";
import HeaderTitle from "../../components/Header";
import InventoryList from "./InventoryList";
function Inventory() {
  return (
    <Container maxWidth="md">
      <HeaderTitle title="Manage Inventory" />
      <InventoryList />
    </Container>
  );
}

export default Inventory;
