"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/inventoryRoutes.ts
const express_1 = require("express");
const inventoryController_1 = require("../controllers/inventoryController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Public route: Get all products
router.get("/", inventoryController_1.getProducts);
// Admin-only route: Sync inventory
router.get("/sync", authMiddleware_1.isAdmin, inventoryController_1.syncInventory);
// Admin-only route: Update a product
router.put("/:id", authMiddleware_1.isAdmin, inventoryController_1.updateProduct);
// Admin-only route: Delete a product
router.delete("/:id", authMiddleware_1.isAdmin, inventoryController_1.deleteProduct);
exports.default = router;
