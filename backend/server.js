import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/admin', adminRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('API Klinik Sehat is running. Access endpoints at /api/...');
});

// Health check
app.get('/health', (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});

// Temporary Route to Reset Admin Password
app.get('/reset-admin-password', async (req, res) => {
  try {
    const hash = '$2a$10$ZoDgl/wenIMJyLLlhV4UaOHNU0bKffJXvmS/46D0ZO2EdYKu3KvQS'; // 123456
    await pool.query("UPDATE admin SET password = ? WHERE email = 'admin@kliniksehat.com'", [hash]);
    res.send('Password admin berhasil di-reset menjadi: 123456. Silakan login sekarang!');
  } catch (error) {
    res.status(500).send('Gagal reset password: ' + error.message);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
