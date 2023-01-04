import Typography from "@mui/material/Typography";

function HeaderTitle({ title }) {
  return (
    <Typography variant="h4" gutterBottom textAlign={"center"} sx={{ mb: 5 }}>
      {title}
    </Typography>
  );
}

export default HeaderTitle;
