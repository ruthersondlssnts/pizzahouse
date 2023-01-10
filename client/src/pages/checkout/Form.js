import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveOrder, sendOrderEmailToAdmin } from "../../apis";
import { useDispatch } from "react-redux";
import { setCart, toggleSuccessOrder } from "../../store/slices/uiSlice";

function Form() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleOrder = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));

    let data = {
      fullname: name,
      customerInformation: {
        name: name,
        fullAddress: address,
        phoneNumber: phone,
        emailAddress: email
      },
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
      dispatch(setCart(0));
      dispatch(toggleSuccessOrder(true));
      triggerEmail(data)
    });
  };

  const triggerEmail = (data) => {
    let body = {
      customer: data.fullname,
      total: data.orderDetails.reduce(
        (total, current) =>
          current.quantity * current.price + total,
        0
      ),
      quantity: data.orderDetails.reduce(
        (total, current) => current.quantity + total,
        0
      )
    }
    sendOrderEmailToAdmin(body)
  }

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
       <TextField
        label="Email"
        variant="outlined"
        fullWidth
        type="email"
        sx={{ mb: 2 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
       <TextField
        label="Phone"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
       <TextField
        label="Address"
        variant="outlined"
        fullWidth
        value={address}
        sx={{ mb: 2 }}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleOrder}>
        Place Order
      </Button>
    </>
  );
}

export default Form;
