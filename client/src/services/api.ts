import axios from "axios";

const API_URL = "http://localhost:5017/api/inventory"; // Your API base URL

// Function to fetch products from the backend API
export const fetchProductsFromAPI = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Rethrow error for handling in thunk
  }
};

export const deleteProduct = async (id: string, role: string) => {
  console.log(role, "role");
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "User-Role": role, // Pass role in header
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw error;
  }
};

// Function to sync inventory from the main API
export const syncInventory = async (role: string) => {
  try {
    const response = await axios.get(`${API_URL}/sync`, {
      headers: {
        "Content-Type": "application/json",
        "User-Role": role, // Ensure only admins can sync inventory
      },
    });

    console.log("Synced Inventory:", response.data.products);
    return response.data;
  } catch (error) {
    console.error("Error syncing inventory:", error);
    throw error;
  }
};
