import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Product } from "../types";

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

  useEffect(() => {
    if (product) setUpdatedProduct(product);
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!updatedProduct) return;
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSave = () => {
    if (updatedProduct) onSave(updatedProduct);
  };

  const isSaveDisabled =
    !updatedProduct?.name ||
    !updatedProduct?.category ||
    !updatedProduct?.price;

  if (!isOpen || !updatedProduct) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Header */}
        <div className="modal-header">
          <h2>Edit product</h2>
          <div>{updatedProduct?.name}</div>
          <button onClick={onClose}>✖️</button>
        </div>

        {/* Input Fields in Grid */}
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

        {/* Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaveDisabled}
            className="save-button"
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EditModal;
