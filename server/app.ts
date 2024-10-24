import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db';
import inventoryRoutes from './src/routes/inventoryRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5017;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Routes
app.use('/api/inventory', inventoryRoutes);


connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;