import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

console.log('🔧 Database Configuration:');
console.log('  DB_HOST:', process.env.DB_HOST || 'localhost (default)');
console.log('  DB_USER:', process.env.DB_USER || 'root (default)');
console.log('  DB_NAME:', process.env.DB_NAME || 'clinic_queue_db (default)');
console.log('  DB_PORT:', process.env.DB_PORT || '3306 (default)');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'clinic_queue_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
