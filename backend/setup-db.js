import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function setupDatabase() {
  let connection;

  try {
    console.log('🔍 Checking database setup...');

    connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'clinic_queue_db',
      port: process.env.DB_PORT || 3306,
      multipleStatements: true
    });

    // Check if tables exist
    const [tables] = await connection.query("SHOW TABLES LIKE 'admin'");

    if (tables.length === 0) {
      console.log('📋 Tables not found. Creating database schema...');

      const sqlPath = path.join(__dirname, 'migrations', 'create_tables_only.sql');
      const sqlContent = fs.readFileSync(sqlPath, 'utf8');

      // Split by semicolon and execute each statement
      const statements = sqlContent
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0);

      console.log(`🚀 Executing ${statements.length} SQL statements...`);

      for (const statement of statements) {
        try {
          await connection.query(statement);
        } catch (err) {
          console.error('⚠️ Error executing statement:', statement.substring(0, 50) + '...');
          console.error('   Error:', err.message);
          // Continue with next statement or throw depending on severity
          // For now we throw to stop on error
          throw err;
        }
      }

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
