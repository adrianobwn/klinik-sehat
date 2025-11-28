import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Parse MySQL URL if available (Railway format)
let dbConfig;
const mysqlUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;

if (mysqlUrl) {
  console.log('🔗 Using MySQL URL connection');
  const url = new URL(mysqlUrl);
  dbConfig = {
    host: url.hostname,
    user: url.username,
    password: url.password,
    database: url.pathname.substring(1),
    port: url.port || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
} else {
  console.log('🔧 Using environment variables');
  // Support both custom and Railway's auto-generated MySQL variable names
  dbConfig = {
    host: process.env.DB_HOST || process.env.MYSQLHOST || '127.0.0.1',
    user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
    database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'clinic_queue_db',
    port: process.env.DB_PORT || process.env.MYSQLPORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
}

console.log('🔧 Database Configuration:');
console.log('  Host:', dbConfig.host);
console.log('  User:', dbConfig.user);
console.log('  Database:', dbConfig.database);
console.log('  Port:', dbConfig.port);

const pool = mysql.createPool(dbConfig);

export default pool;
