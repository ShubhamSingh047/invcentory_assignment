import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import modalReducer from "./slices/modalSlice"; // Import modal slice

const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    modal: modalReducer, // Add modal reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
