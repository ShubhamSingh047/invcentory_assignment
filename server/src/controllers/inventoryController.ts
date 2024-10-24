// src/controllers/inventoryController.ts
import axios from "axios";
import { Request, Response } from "express";
import Product from "../models/Product";

// Define a TypeScript interface for Product
interface ProductData {
  name: string;
  category: string;
  value: string;
  quantity: number;
  price: string;
  disabled?: boolean;
}

// Sanitize product data before storing it in the database
const sanitizeProductData = (product: ProductData) => ({
  name: product.name,
  category: product.category,
  value: parseFloat(product.value.replace(/[^0-9.-]+/g, "")) || 0,
  quantity: product.quantity || 0,
  price: parseFloat(product.price.replace(/[^0-9.-]+/g, "")) || 0,
  disabled: product.disabled || false,
});

// Sync data from external API into MongoDB
export const syncInventory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data: products } = await axios.get<ProductData[]>(
      "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
    );
    const sanitizedProducts = products.map(sanitizeProductData);

    await Product.deleteMany();
    await Product.insertMany(sanitizedProducts);

    res.status(200).json({
      message: "Inventory synced successfully",
      products: sanitizedProducts,
    });
  } catch (error: unknown) {
    console.error("Error syncing inventory:", error);
    res.status(500).json({
      message: "Error syncing inventory",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get all products from MongoDB
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error: unknown) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: "Failed to fetch products",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update a product
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(updatedProduct);
  } catch (error: unknown) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Failed to update product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete a product
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: unknown) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      message: "Failed to delete product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
