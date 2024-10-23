// redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  role: "admin" | "user"; // The current role of the user
}

const initialState: AuthState = {
  role: "user", // Default role is 'user'
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole(state, action: PayloadAction<"admin" | "user">) {
      state.role = action.payload; // Update the user role
    },
  },
});

export const { setRole } = authSlice.actions; // Export the action to change role
export default authSlice.reducer; // Export the reducer for the store
