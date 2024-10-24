// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import modalReducer from "./slices/modalSlice";

// Define store type explicitly
const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    modal: modalReducer,
  },
  // Add middleware to handle serialization
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["products/fetch/fulfilled"],
      },
    }),
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
