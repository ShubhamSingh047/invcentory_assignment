// redux/slices/productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchProductsFromAPI } from "../../services/api"; // Import API function

// Define Product interface
interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  value: number;
}

// Define Product slice state
interface ProductState {
  products: Product[];
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
};

// Async thunk to fetch products from the backend
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  return await fetchProductsFromAPI();
});

// Create product slice with reducers
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Action to remove a product from state
    deleteProductFromState(state, action: PayloadAction<string>) {
      state.products = state.products.filter((p) => p._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Export the delete action and the reducer
export const { deleteProductFromState } = productSlice.actions;
export default productSlice.reducer;
