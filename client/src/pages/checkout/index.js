import Container from "@mui/material/Container/Container";
import { Box } from "@mui/system";
import HeaderTitle from "../../components/Header";
import Form from "./Form";
import Summary from "./Summary";

function Checkout() {
  return (
    <Container maxWidth="md">
      <HeaderTitle title="Checkout" />
      <Box display="flex" flexDirection="row">
        <Box flex={1}>
          <Summary />
        </Box>
        <Box flex={1}>
          <Form />
        </Box>
      </Box>
    </Container>
  );
}

export default Checkout;
