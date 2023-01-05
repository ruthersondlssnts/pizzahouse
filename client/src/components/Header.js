import Typography from "@mui/material/Typography";

function HeaderTitle({ title }) {
  return (
    <Typography
      variant="h4"
      gutterBottom
      textAlign={"center"}
      sx={{ mb: 5, letterSpacing: "0.1rem", textTransform: "uppercase" }}
    >
      {title}
    </Typography>
  );
}

export default HeaderTitle;
