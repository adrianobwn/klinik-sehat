import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupDatabase() {
  let connection;
  
  try {
    console.log('🔍 Checking database setup...');
    
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
      multipleStatements: true
    });

    // Check if tables exist
    const [tables] = await connection.query("SHOW TABLES LIKE 'admin'");
    
    if (tables.length === 0) {
      console.log('📋 Tables not found. Creating database schema...');
      
      const sqlPath = path.join(__dirname, 'migrations', 'create_tables_only.sql');
      const sql = fs.readFileSync(sqlPath, 'utf8');
      
      await connection.query(sql);
      
      console.log('✅ Database tables created successfully!');
    } else {
      console.log('✅ Database tables already exist. Skipping setup.');
    }
    
  } catch (error) {
    console.error('❌ Database setup error:', error.message);
    // Don't exit - let app continue even if setup fails
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();
