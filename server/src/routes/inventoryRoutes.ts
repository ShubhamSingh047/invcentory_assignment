// src/routes/inventoryRoutes.ts
import { Router } from "express";
import {
  syncInventory,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/inventoryController";
import { isAdmin } from "../middleware/authMiddleware";

const router = Router();

// Public route: Get all products
router.get("/", getProducts);

// Admin-only route: Sync inventory
router.get("/sync", isAdmin, syncInventory);

// Admin-only route: Update a product
router.put("/:id", isAdmin, updateProduct);

// Admin-only route: Delete a product
router.delete("/:id", isAdmin, deleteProduct);

export default router;
