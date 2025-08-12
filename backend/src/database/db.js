const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, '../../data/bakery.db');

// Create data directory if it doesn't exist
const fs = require('fs');
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(DB_PATH);

const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Products table
      db.run(`
        CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          description TEXT,
          price REAL NOT NULL,
          image_url TEXT,
          is_featured BOOLEAN DEFAULT 0,
          is_active BOOLEAN DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Orders table
      db.run(`
        CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          reference TEXT UNIQUE NOT NULL,
          customer_name TEXT NOT NULL,
          customer_email TEXT NOT NULL,
          customer_phone TEXT,
          total REAL NOT NULL,
          status TEXT DEFAULT 'pending',
          notes TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Order items table
      db.run(`
        CREATE TABLE IF NOT EXISTS order_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          order_id INTEGER NOT NULL,
          product_id INTEGER NOT NULL,
          quantity INTEGER NOT NULL,
          unit_price REAL NOT NULL,
          FOREIGN KEY (order_id) REFERENCES orders (id),
          FOREIGN KEY (product_id) REFERENCES products (id)
        )
      `);

      // Admin users table
      db.run(`
        CREATE TABLE IF NOT EXISTS admin_users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          name TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          reject(err);
        } else {
          // Create default admin user
          const adminEmail = 'admin@sweetcrumbs.demo';
          const adminPassword = 'DemoAdmin123!';
          const passwordHash = bcrypt.hashSync(adminPassword, 10);
          
          db.run(
            'INSERT OR IGNORE INTO admin_users (email, password_hash, name) VALUES (?, ?, ?)',
            [adminEmail, passwordHash, 'Demo Admin'],
            (err) => {
              if (err) {
                console.error('Error creating admin user:', err);
              } else {
                console.log('✅ Default admin user created');
              }
              resolve();
            }
          );
        }
      });
    });
  });
};

const getDb = () => db;

module.exports = {
  initDatabase,
  getDb
};
