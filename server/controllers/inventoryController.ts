import axios from "axios";
import { Request, Response } from "express";
import Product from "../models/Product";

// Sanitize product data before storing it in the database
const sanitizeProductData = (product: any) => ({
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
    const { data: products } = await axios.get(
      "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
    );
    const sanitizedProducts = products.map(sanitizeProductData);

    await Product.deleteMany(); // Clear existing products
    await Product.insertMany(sanitizedProducts); // Insert sanitized products

    res
      .status(200)
      .json({
        message: "Inventory synced successfully",
        products: sanitizedProducts,
      });
  } catch (error) {
    console.error("Error syncing inventory:", error);
    res.status(500).json({ message: "Error syncing inventory", error });
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
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products", error });
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
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product", error });
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
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product", error });
  }
};
