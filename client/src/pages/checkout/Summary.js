import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

export default function Summary() {
  const cartItems = JSON.parse(localStorage.getItem("cart"));

  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {cartItems &&
          cartItems.length > 0 &&
          cartItems.map((c) => (
            <>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={c.name}
                    src="https://toppng.com/uploads/preview/transparent-cartoon-pizza-11549978544rnyl3bi6uv.png"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${c.name} — ₱ ${c.price}`}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Qty - {c.quantity}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))}

        <Typography
          variant="h6"
          gutterBottom
          component="div"
          sx={{ my: 3, textAlign: "center" }}
        >
          Total:
          <Box component="span" sx={{ ml: 4 }}>
            ₱{" "}
            {cartItems?.reduce(
              (total, current) => current.quantity * current.price + total,
              0
            ) ?? 0}
          </Box>
        </Typography>
      </List>
    </>
  );
}
