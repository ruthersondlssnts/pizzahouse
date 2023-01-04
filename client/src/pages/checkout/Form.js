import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Billing Details
      </Typography>

      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
        sx={{ my: 2 }}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/")}
      >
        Place Order
      </Button>
    </>
  );
}

export default Form;
