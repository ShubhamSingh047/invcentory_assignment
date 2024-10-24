// src/services/ToastService.ts
import { toast, ToastOptions } from "react-toastify";

// Default Toast Options
const defaultToastOptions: ToastOptions = {
  position: "bottom-right", // Show toast in the bottom-right corner
  autoClose: 3000, // Close after 3 seconds
  hideProgressBar: false, // Show progress bar
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark", // Optional: Use dark theme
};

// Helper to show a toast (success or error)
const showToast = (message: string, type: "success" | "error") => {
  const backgroundColor = type === "success" ? "#166535" : "#ac022d"; // Green for success, red for error

  toast[type](message, {
    ...defaultToastOptions,
    style: {
      backgroundColor,
      color: "#fff", // White text color
      fontWeight: "bold", // Make text bold
    },
  });
};

// Exported functions to show success or error toasts
export const showSuccessToast = (message: string) =>
  showToast(message, "success");

export const showErrorToast = (message: string) => showToast(message, "error");
