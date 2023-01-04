import { Box } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{ background: "#eee", p: 4, mt: 10, textAlign: "center" }}
    >
      <p>Copyright 2023 Pizza House by Rutherson</p>
    </Box>
  );
}

export default Footer;
