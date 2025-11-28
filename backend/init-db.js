import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupDatabase() {
  let connection;

  try {
    console.log('🚀 Starting Database Setup Script v2.1 (Sequential Execution with Pool)');
    console.log('🔍 Checking database setup...');

    // Get a connection from the pool
    connection = await pool.getConnection();

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
          // Throw to stop execution on error
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
      connection.release();
    }
    // We don't end the pool because server.js needs it
    // But since this is a separate process in "startCommand", we should end it?
    // "startCommand": "node init-db.js && node server.js"
    // Yes, we should end the pool so the script exits.
    await pool.end();
  }
}

setupDatabase();
