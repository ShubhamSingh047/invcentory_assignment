import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { openModal } from "../redux/slices/modalSlice";
import { deleteProduct } from "../services/api"; // Import the delete function
import { deleteProductFromState } from "../redux/slices/productSlice"; // Import the action
import { showSuccessToast, showErrorToast } from "../component/ToastService"; // Import ToastService
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Product } from "../types";

interface ProductRowProps {
  product: Product;
}

const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>(); // Correctly typed dispatch
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // For loading state

  const role = useSelector((state: RootState) => state.auth.role);

  const handleEdit = () => {
    dispatch(openModal(product)); // Open the edit modal
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return; // Abort if user cancels the action
    }

    try {
      setIsDeleting(true); // Start loading state
      await deleteProduct(product._id, "user"); // Call the DELETE API

      // Dispatch action to remove the product from the Redux store
      dispatch(deleteProductFromState(product._id));

      // Show success toast
      showSuccessToast("Product deleted successfully!");
    } catch (error) {
      // Show error toast
      showErrorToast(`Failed to delete product. Please try again.`);
    } finally {
      setIsDeleting(false); // End loading state
    }
  };

  const toggleRow = () => setIsDisabled((prev) => !prev);

  return (
    <tr
      className={`${
        isDisabled ? "bg-gray-600 opacity-50" : "bg-gray-800 hover:bg-gray-700"
      }`}
    >
      <td className="border border-gray-700 px-6 py-4">{product.name}</td>
      <td className="border border-gray-700 px-6 py-4">{product.category}</td>
      <td className="border border-gray-700 px-6 py-4">${product.price}</td>
      <td className="border border-gray-700 px-6 py-4">{product.quantity}</td>
      <td className="border border-gray-700 px-6 py-4">${product.value}</td>
      <td className="border border-gray-700 px-6 py-4">
        <div className="flex space-x-2" style={{ cursor: "pointer" }}>
          {role === "admin" && (
            <>
              <button
                onClick={handleEdit}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                disabled={isDisabled}
              >
                ✏️
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                disabled={isDisabled || isDeleting}
              >
                {isDeleting ? "Deleting..." : "🛢️"}
              </button>
            </>
          )}

          <button
            onClick={toggleRow}
            className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded"
          >
            {isDisabled ? <FaEyeSlash /> : <FaRegEye />}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
