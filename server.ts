import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import inventoryRoutes from './routes/inventoryRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount auth and inventory routes
app.use('/auth', authRoutes); // 👈 so /auth/zoho-login and /auth/zoho/callback work
app.use('/api/inventory', inventoryRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
