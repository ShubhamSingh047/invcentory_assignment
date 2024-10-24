import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Product } from "../types";
import { updateProduct } from "../services/api"; // API call
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { updateProductInState } from "../redux/slices/productSlice";
import { showSuccessToast, showErrorToast } from "../component/ToastService"; // Toasts

interface EditModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  product,
  onClose,
  onSave,
}) => {
  const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const role = useSelector((state: RootState) => state.auth.role); // Get user role
  const dispatch = useDispatch<AppDispatch>(); // Setup Redux dispatch

  // Sync the product to state when it changes
  useEffect(() => {
    if (product) setUpdatedProduct(product);
  }, [product]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!updatedProduct) return;
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  // Handle Save
  const handleSave = async () => {
    if (!updatedProduct) return;

    try {
      setIsSaving(true); // Start saving state

      // Call API to update product
      await updateProduct(updatedProduct._id, updatedProduct, role);

      // Update Redux state with the new product details
      dispatch(updateProductInState(updatedProduct));

      // Show success notification
      showSuccessToast("Product updated successfully!");

      // Call onSave callback to notify parent & close the modal
      onSave(updatedProduct);
      onClose();
    } catch (error) {
      // Show error notification
      showErrorToast("Failed to update product. Please try again.");
    } finally {
      setIsSaving(false); // End saving state
    }
  };

  // Disable Save button if any required field is empty
  const isSaveDisabled =
    !updatedProduct?.name ||
    !updatedProduct?.category ||
    !updatedProduct?.price;

  // If modal is not open, don't render it
  if (!isOpen || !updatedProduct) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
          <h2>Edit Product</h2>
          <div>{updatedProduct.name}</div>
          <button onClick={onClose}>✖️</button>
        </div>

        {/* Modal Body with Input Fields */}
        <div className="modal-grid">
          <div>
            <label>
              Category
              <input
                name="category"
                value={updatedProduct.category}
                onChange={handleChange}
                className="modal-input"
              />
            </label>
          </div>
          <div>
            <label>
              Price
              <input
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={handleChange}
                className="modal-input"
              />
            </label>
          </div>
          <div>
            <label>
              Quantity
              <input
                name="quantity"
                type="number"
                value={updatedProduct.quantity}
                onChange={handleChange}
                className="modal-input"
              />
            </label>
          </div>
          <div>
            <label>
              Value
              <input
                name="value"
                type="number"
                value={updatedProduct.value}
                onChange={handleChange}
                className="modal-input"
              />
            </label>
          </div>
        </div>

        {/* Modal Footer with Save and Cancel Buttons */}
        <div className="modal-footer">
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaveDisabled || isSaving}
            className="save-button"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>,
    document.body // Portal target
  );
};

export default EditModal;
