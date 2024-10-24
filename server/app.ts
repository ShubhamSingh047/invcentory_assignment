import express from "express";
import cors from "cors"; // Import CORS middleware
import connectDB from "./src/config/db";
import inventoryRoutes from "./src/routes/inventoryRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
connectDB();

// Use CORS to allow requests from all origins
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Register inventory routes
app.use("/api/inventory", inventoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
