import express from "express";
import connectDB from "./config/db"; // DB connection
import inventoryRoutes from "./routes/inventoryRoutes"; // Inventory routes
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
connectDB(); // Connect to MongoDB

app.use(express.json()); // Middleware to parse JSON requests

// Register inventory routes
app.use("/api/inventory", inventoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
