import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store"; // Import RootState & AppDispatch types
import { syncInventory } from "../services/api"; // Import the sync function
import { fetchProducts } from "../redux/slices/productSlice"; // Import fetchProducts thunk

const SyncMain: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const role = useSelector((state: RootState) => state.auth.role); // Get role from Redux
  const dispatch = useDispatch<AppDispatch>(); // Correctly typed dispatch

  const handleSyncInventory = async () => {
    try {
      setLoading(true);
      setMessage(null);

      // Call the sync inventory API with role authorization
      await syncInventory(role);
      setMessage("Inventory synced successfully!");

      // After sync, re-fetch products to reflect changes
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Error syncing inventory:", error);
      setMessage("Error: Failed to sync inventory");
    } finally {
      setLoading(false);
    }
  };

  if (role !== "admin") return null; // Only allow admin to sync

  return (
    <div className="sync-main p-8">
      <h1 className="text-3xl font-bold mb-4" onClick={handleSyncInventory}>
        Sync Inventory 🔄
      </h1>

      {loading && <p className="mt-4 text-white">Syncing...</p>}

      {message && (
        <p
          className={`mt-4 ${
            message.startsWith("Inventory") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default SyncMain;
