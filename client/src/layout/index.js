import { Alert, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { toggleSuccessOrder } from "../store/slices/uiSlice";
import Footer from "./Footer";
import Navbar from "./Navbar";
function Layout() {
  const { successOrder } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: "75.5vh" }}>
        <Outlet />
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={successOrder}
        autoHideDuration={6000}
        onClose={() => dispatch(toggleSuccessOrder(false))}
      >
        <Alert
          onClose={() => dispatch(toggleSuccessOrder(false))}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thank you for your order!
        </Alert>
      </Snackbar>
      <Footer />
    </>
  );
}

export default Layout;
