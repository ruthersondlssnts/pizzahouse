import { Box } from "@mui/material";
import ProductCatalog from "./ProductCatalog";

function Home() {
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ height: "70vh" }}
      >
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Box
            component="img"
            sx={{
              textAlign: "center",
            }}
            src={"/images/pizza-house.png"}
          />
          <Box
            sx={{
              fontSize: "50px",
              textTransform: "uppercase",
              borderBottom: "2px solid",
              padding: "12px 0",
              color: "#5e2195",
            }}
          >
            The North's Best Pizzas
          </Box>
        </Box>
      </Box>
      <ProductCatalog />
    </>
  );
}

export default Home;
