import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

export default function Summary() {
  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://toppng.com/uploads/preview/transparent-cartoon-pizza-11549978544rnyl3bi6uv.png"
            />
          </ListItemAvatar>
          <ListItemText
            primary="Hawaian — ₱ 350"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Qty - 5
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://toppng.com/uploads/preview/transparent-cartoon-pizza-11549978544rnyl3bi6uv.png"
            />
          </ListItemAvatar>
          <ListItemText
            primary="Volcano — ₱ 503"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Qty - 3
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          sx={{ my: 3, textAlign: "center" }}
        >
          Total:
          <Box component="span" sx={{ ml: 4 }}>
            ₱ 5,320.00
          </Box>
        </Typography>
      </List>
    </>
  );
}
