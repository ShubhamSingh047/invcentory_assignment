"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProducts = exports.syncInventory = void 0;
// src/controllers/inventoryController.ts
const axios_1 = __importDefault(require("axios"));
const Product_1 = __importDefault(require("../models/Product"));
// Sanitize product data before storing it in the database
const sanitizeProductData = (product) => ({
    name: product.name,
    category: product.category,
    value: parseFloat(product.value.replace(/[^0-9.-]+/g, "")) || 0,
    quantity: product.quantity || 0,
    price: parseFloat(product.price.replace(/[^0-9.-]+/g, "")) || 0,
    disabled: product.disabled || false,
});
// Sync data from external API into MongoDB
const syncInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data: products } = yield axios_1.default.get("https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory");
        const sanitizedProducts = products.map(sanitizeProductData);
        yield Product_1.default.deleteMany();
        yield Product_1.default.insertMany(sanitizedProducts);
        res.status(200).json({
            message: "Inventory synced successfully",
            products: sanitizedProducts,
        });
    }
    catch (error) {
        console.error("Error syncing inventory:", error);
        res.status(500).json({
            message: "Error syncing inventory",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.syncInventory = syncInventory;
// Get all products from MongoDB
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find();
        res.status(200).json(products);
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            message: "Failed to fetch products",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getProducts = getProducts;
// Update a product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedProduct = yield Product_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            message: "Failed to update product",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.updateProduct = updateProduct;
// Delete a product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedProduct = yield Product_1.default.findByIdAndDelete(id);
        if (!deletedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({
            message: "Failed to delete product",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.deleteProduct = deleteProduct;
