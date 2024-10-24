// src/services/ToastService.ts
import { toast, ToastOptions } from "react-toastify";

// Default Toast Options
const defaultToastOptions: ToastOptions = {
  position: "bottom-right", 
  autoClose: 3000, 
  hideProgressBar: false, 
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark", 
};

// Helper to show a toast (success or error)
const showToast = (message: string, type: "success" | "error") => {
  const backgroundColor = type === "success" ? "#166535" : "#ac022d";

  toast[type](message, {
    ...defaultToastOptions,
    style: {
      backgroundColor,
      color: "#fff", 
      fontWeight: "bold", 
    },
  });
};

// Exported functions to show success or error toasts
export const showSuccessToast = (message: string) =>
  showToast(message, "success");

export const showErrorToast = (message: string) => showToast(message, "error");
