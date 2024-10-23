import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { openModal } from "../redux/slices/modalSlice";
import { deleteProduct } from "../services/api"; // Import the delete function
import { deleteProductFromState } from "../redux/slices/productSlice"; // Import the action
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
// import { MdDeleteForever } from "react-icons/md";

interface ProductRowProps {
  product: Product;
}

const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>(); // Correctly typed dispatch
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // For loading state

  const role = useSelector((state: RootState) => state.auth.role);

  const handleEdit = () => {
    dispatch(openModal(product));
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return; // Abort if user cancels the action
    }

    try {
      setIsDeleting(true); // Start loading state
      await deleteProduct(product._id, role); // Call the DELETE API
      console.log("Product deleted successfully!");

      // Dispatch the action to remove the product from the store
      dispatch(deleteProductFromState(product._id));
    } catch (error) {
      alert(`Failed to delete product. ${error}`);
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
