import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchProducts } from "../redux/slices/productSlice";
import { openModal, closeModal } from "../redux/slices/modalSlice"; // Import closeModal here
import ProductTable from "./ProductTable";
import EditModal from "./EditModal";
import StatCard from "./StatsCard";
import { FaShoppingCart } from "react-icons/fa";
import { MdRemoveShoppingCart, MdCurrencyExchange } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import RoleToggleSwitch from "./RoleToggleSwitch";
import SyncMain from "./SyncMain";

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );
  const { isOpen, selectedProduct } = useSelector(
    (state: RootState) => state.modal
  );

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch products on mount
  }, [dispatch]);

  if (loading) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="p-8">
      <RoleToggleSwitch />

      <SyncMain />
      <h1 className="text-3xl font-bold mb-8">Inventory Stats</h1>

      <div className="stats-container">
        <StatCard
          icon={<FaShoppingCart />}
          label="Total Products"
          value={products.length}
        />
        <StatCard
          icon={<MdCurrencyExchange />}
          label="Total Store Value"
          value={`$${products.reduce((acc, p) => acc + p.value, 0)}`}
        />
        <StatCard
          icon={<MdRemoveShoppingCart />}
          label="Out of Stock"
          value={products.filter((p) => p.quantity === 0).length}
        />
        <StatCard
          icon={<BiCategoryAlt />}
          label="No of Categories"
          value={new Set(products.map((p) => p.category)).size}
        />
      </div>

      {/* Product Table with edit functionality */}
      <ProductTable
        products={products}
        role="admin"
        onEditProduct={(product) => dispatch(openModal(product))} // Open modal with product data
      />

      {/* Edit Modal */}
      <EditModal
        isOpen={isOpen}
        product={selectedProduct}
        onClose={() => dispatch(closeModal())} // Close the modal when needed
        onSave={(updatedProduct) => {
          console.log("Saved Product:", updatedProduct);
          dispatch(closeModal()); // Close the modal after saving
        }}
      />
    </div>
  );
};

export default DashboardPage;
