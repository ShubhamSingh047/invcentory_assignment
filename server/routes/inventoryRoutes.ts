import express from "express";
import {
  syncInventory,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/inventoryController";
import { isAdmin } from "../middleware/authMiddleware";

const router = express.Router();

// Sync inventory (Admin only)
router.get("/sync", isAdmin, syncInventory);

// Get all products (Available to all users)
router.get("/", getProducts);

// Update a product (Admin only)
router.put("/:id", isAdmin, updateProduct);

// Delete a product (Admin only)
router.delete("/:id", isAdmin, deleteProduct);

export default router;
