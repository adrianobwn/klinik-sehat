import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Debug logging for Railway deployment
console.log('🔍 Environment variables check:');
console.log('  MYSQL_URL:', process.env.MYSQL_URL ? 'SET' : 'NOT SET');
console.log('  DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
console.log('  MYSQLHOST:', process.env.MYSQLHOST || 'NOT SET');
console.log('  MYSQLUSER:', process.env.MYSQLUSER ? 'SET' : 'NOT SET');
console.log('  MYSQLPASSWORD:', process.env.MYSQLPASSWORD ? 'SET' : 'NOT SET');
console.log('  MYSQLDATABASE:', process.env.MYSQLDATABASE || 'NOT SET');
console.log('  DB_HOST:', process.env.DB_HOST || 'NOT SET');

// Parse MySQL URL if available (Railway format)
let dbConfig;
const mysqlUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;

if (mysqlUrl) {
  console.log('🔗 Using MySQL URL connection');
  try {
    const url = new URL(mysqlUrl);

    // Try to parse with URL object first
    let username = decodeURIComponent(url.username || '');
    let password = decodeURIComponent(url.password || '');

    // If URL object failed to get credentials, try regex parsing
    if (!username) {
      console.log('⚠️ URL parsing returned empty username, trying regex...');
      const match = mysqlUrl.match(/:\/\/([^:]+):([^@]+)@/);
      if (match) {
        username = match[1];
        password = match[2];
        console.log('✅ Regex parsing successful');
      }
    }

    // Final fallback: use environment variables or default to 'root'
    username = username || process.env.MYSQLUSER || process.env.DB_USER || 'root';
    password = password || process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '';

    console.log('🔍 Parsed URL components:');
    console.log('  Protocol:', url.protocol);
    console.log('  Hostname:', url.hostname);
    console.log('  Username:', username); // Log actual username to verify
    console.log('  Password:', password ? '***' : '(empty)');
    console.log('  Database:', url.pathname.substring(1));
    console.log('  Port:', url.port || 3306);

    dbConfig = {
      host: url.hostname,
      user: username,
      password: password,
      database: url.pathname.substring(1),
      port: url.port || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    };
  } catch (error) {
    console.error('❌ Error parsing MYSQL_URL:', error.message);
    throw error;
  }
} else {
  console.log('🔧 Using environment variables');

  // Detect if we're in a Railway/production environment
  const isProduction = process.env.RAILWAY_ENVIRONMENT ||
    process.env.MYSQLDATABASE ||
    process.env.NODE_ENV === 'production';

  // In production, don't use localhost defaults
  const defaultHost = isProduction ? undefined : '127.0.0.1';
  const defaultUser = isProduction ? undefined : 'root';
  const defaultPassword = isProduction ? undefined : '';
  const defaultDatabase = isProduction ? undefined : 'clinic_queue_db';

  // Support both custom and Railway's auto-generated MySQL variable names
  dbConfig = {
    host: process.env.DB_HOST || process.env.MYSQLHOST || defaultHost,
    user: process.env.DB_USER || process.env.MYSQLUSER || defaultUser,
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || defaultPassword,
    database: process.env.DB_NAME || process.env.MYSQLDATABASE || defaultDatabase,
    port: process.env.DB_PORT || process.env.MYSQLPORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };

  // Validate required fields in production
  if (isProduction && (!dbConfig.host || !dbConfig.user || !dbConfig.database)) {
    console.error('❌ Missing required database configuration in production environment!');
    console.error('   Required: MYSQL_URL or (MYSQLHOST + MYSQLUSER + MYSQLDATABASE)');
    console.error('   Available variables:', {
      MYSQLHOST: process.env.MYSQLHOST ? 'SET' : 'NOT SET',
      MYSQLUSER: process.env.MYSQLUSER ? 'SET' : 'NOT SET',
      MYSQLDATABASE: process.env.MYSQLDATABASE ? 'SET' : 'NOT SET',
      MYSQL_URL: process.env.MYSQL_URL ? 'SET' : 'NOT SET'
    });
  }
}

console.log('🔧 Database Configuration:');
console.log('  Host:', dbConfig.host);
console.log('  User:', dbConfig.user);
console.log('  Database:', dbConfig.database);
console.log('  Port:', dbConfig.port);

const pool = mysql.createPool(dbConfig);

export default pool;
