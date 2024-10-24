"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Import CORS middleware
const db_1 = __importDefault(require("./src/config/db"));
const inventoryRoutes_1 = __importDefault(require("./src/routes/inventoryRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.default)();
// Use CORS to allow requests from all origins
app.use((0, cors_1.default)());
// Middleware to parse JSON requests
app.use(express_1.default.json());
// Register inventory routes
app.use("/api/inventory", inventoryRoutes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
