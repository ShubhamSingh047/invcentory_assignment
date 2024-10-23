import React from "react";
import ProductRow from "./ProductRow";
import { Product } from "../types";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  value: number;
}

interface ProductTableProps {
  products: Product[];
  role: "admin" | "user";
  onEditProduct: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, role,onEditProduct }) => (
  <div className="table-container">
    <table className="table">
      <thead className="bg-gray-700 text-gray-300">
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Value</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow 
          key={product._id} 
          product={product} 
          role={role}
          onEdit={() => onEditProduct(product)}
        />
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductTable;
