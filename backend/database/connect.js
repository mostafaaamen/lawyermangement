import sqlite3 from 'sqlite3';
// Open the database and enable foreign key support
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Could not connect to database:', err);
  } else {
    console.log('Connected to SQLite database');
    // Enable foreign key support for the database
    db.run('PRAGMA foreign_keys = ON');
  }
});
export const initDb = () => {
  // Create users table if not exists
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      name TEXT, 
      company TEXT,
      idCard TEXT,
      phone TEXT, 
      gmail TEXT, 
      nationality TEXT,
      address TEXT,
      time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
      nots TEXT
    )
  `);
      // Create lawsuite table if not exists with lawsuiteType
  db.run(`
    CREATE TABLE IF NOT EXISTS lawsuiteType (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
      title TEXT
    )
  `);
    // Create lawsuite table if not exists with clientType
  db.run(`
    CREATE TABLE IF NOT EXISTS clientType (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      title TEXT,
      time TIMESTAMP DEFAULT CURRENT_TIMESTAMP  

    )
  `);
  // Create lawsuite table if not exists with foreign key referencing users(id)
  db.run(`
    CREATE TABLE IF NOT EXISTS lawsuites (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      clientName TEXT, 
      clientType TEXT, 
      ginstName TEXT, 
      ginstAddress TEXT,
      ginstPhone TEXT, 
      ginstLawyer TEXT, 
      lawsuitType TEXT,
      lawsuitTitle TEXT, 
      lawsuitNumber TEXT, 
      courtName TEXT, 
      payment INTEGER,
      nots TEXT,
      time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
      user_id INTEGER, 
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      title TEXT, 
      date TEXT, 
      nots TEXT,
      time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
      lawsuites_id INTEGER, 
      FOREIGN KEY (lawsuites_id) REFERENCES lawsuites(id) ON DELETE CASCADE
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      title TEXT, 
      payment INTEGER ,
      nots TEXT,
      time TIMESTAMP DEFAULT (DATETIME('now', '+2 hours')),
      lawsuites_id INTEGER, 
      FOREIGN KEY (lawsuites_id) REFERENCES lawsuites(id) ON DELETE CASCADE
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      title TEXT, 
      url TEXT,
      nots TEXT,
      time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
      lawsuites_id INTEGER, 
      FOREIGN KEY (lawsuites_id) REFERENCES lawsuites(id) ON DELETE CASCADE
    )
  `);

};
export const getDb = () => db;
