import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart:
    JSON.parse(localStorage.getItem("cart"))?.reduce(
      (total, current) => current.quantity + total,
      0
    ) ?? 0,
  successOrder: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSuccessOrder(state, action) {
      state.successOrder = action.payload;
    },
    setCart(state, action) {
      state.cart = action.payload;
    },
  },
});

export const { toggleSuccessOrder, setCart } = uiSlice.actions;

export default uiSlice.reducer;
