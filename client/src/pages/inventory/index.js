import Container from "@mui/material/Container/Container";
import Typography from "@mui/material/Typography";
import InventoryList from "./InventoryList";
function Inventory() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        Manage Inventory
      </Typography>
      <InventoryList />
    </Container>
  );
}

export default Inventory;
