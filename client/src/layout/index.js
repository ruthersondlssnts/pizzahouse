import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
function Layout() {
  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: "73vh" }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

export default Layout;
