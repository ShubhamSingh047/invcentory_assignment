import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { syncInventory } from "../services/api"; // API call to sync inventory
import { fetchProducts } from "../redux/slices/productSlice"; // Refresh products after sync
import { toast } from "react-toastify"; // Toast methods
import { showSuccessToast, showErrorToast } from "../component/ToastService"; // ToastService

const SyncMain: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const role = useSelector((state: RootState) => state.auth.role); // Get role from Redux
  const dispatch = useDispatch<AppDispatch>(); // Set up dispatch

  const handleSyncInventory = async () => {
    const loadingToastId = toast.loading("Syncing inventory..."); // Start loading toast

    try {
      setLoading(true); // Start loading state
      await syncInventory(role); // Sync inventory API call

      // Close the loading toast
      toast.dismiss(loadingToastId);

      // Show success toast notification
      showSuccessToast("Inventory synced successfully!");

      // Refresh product list
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Error syncing inventory:", error);

      // Close the loading toast
      toast.dismiss(loadingToastId);

      // Show error toast notification
      showErrorToast("Failed to sync inventory. Please try again.");
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div
      className="sync-main p-8"
      style={{ visibility: role === "admin" ? "visible" : "hidden" }} // Control visibility
    >
      <h1
        className={`text-3xl font-bold mb-4 cursor-pointer ${
          loading ? "opacity-50" : ""
        }`} // Slightly dim the text during loading
        onClick={!loading ? handleSyncInventory : undefined} // Prevent clicks while loading
      >
        Sync Inventory 🔄
      </h1>
    </div>
  );
};

export default SyncMain;
