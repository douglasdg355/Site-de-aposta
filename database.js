const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const bcrypt = require('bcryptjs');

db.serialize(() => {
  db.run(\`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      balance REAL DEFAULT 100.00
    )
  \`);

  db.run(\`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  \`);

  db.run(\`
    CREATE TABLE IF NOT EXISTS bets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      bet_amount REAL,
      result INTEGER,
      win REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  \`);

  const defaultPass = bcrypt.hashSync('admin123', 10);
  db.run(\`INSERT OR IGNORE INTO admins (username, password) VALUES (?, ?)\`, ['admin', defaultPass]);
});

module.exports = db;
