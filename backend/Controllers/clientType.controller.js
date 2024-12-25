// clientType.controller.js
import { getDb } from '../database/connect.js';
const db = getDb();
export const getClientTypes = (req, res) => {
  db.all(`
    SELECT clientType.*
    FROM clientType
  `, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const clientTypes = [];
    rows.forEach(row => {
      let clientType = clientTypes.find(u => u.id === row.id);
      if (!clientType) {
        clientType = { 
          id: row.id,     
          title:row.title
        };
        clientTypes.push(clientType);
      }
    });
  
    res.json({ clientTypes });
  });
  
};
export const getClientType = (req, res) => {
  const { id } = req.params;
  db.all(`
    SELECT clientType.*
    FROM clientType
  `, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: 'clientType not found' });
    }
    const clientType = {
      id: rows[0].id,
      title: rows.title 
    };
    res.json({ clientType });
  });
};


export const creatClientType= (req, res) => {
  const { title } = req.body;
    console.log(title)
  if (!title) {
    return res.status(400).json({ error: 'title required' });
  }
  const stmt = db.prepare('INSERT INTO clientType (title ) VALUES (?)');
  stmt.run(title, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, title});
  });
  stmt.finalize();
};




export const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const stmt = db.prepare('UPDATE users SET name = ? WHERE id = ?');
  stmt.run(name, id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated successfully' });
  });
  stmt.finalize();
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  const stmt = db.prepare('DELETE FROM users WHERE id = ?');
  stmt.run(id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  });
  stmt.finalize();
};
