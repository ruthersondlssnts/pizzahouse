import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveOrder } from "../../apis";

function Form() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleOrder = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));

    let data = {
      fullname: name,
      orderDetails: cartItems.map((c) => {
        return {
          productId: c.productId,
          price: c.price,
          quantity: c.quantity,
        };
      }),
    };
    saveOrder(data).then(() => {
      navigate("/");
      localStorage.removeItem("cart");
    });
    //console.log(data);
    //
  };

  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Billing Details
      </Typography>

      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
        value={name}
        sx={{ my: 2 }}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleOrder}>
        Place Order
      </Button>
    </>
  );
}

export default Form;
