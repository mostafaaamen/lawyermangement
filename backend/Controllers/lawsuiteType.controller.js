// users.controller.js
import { getDb } from '../database/connect.js';

const db = getDb();
export const getLawsuiteTypes = (req, res) => {
  db.all(`
    SELECT lawsuiteType.*
    FROM lawsuiteType
  `, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Process the results
    const lawsuiteTypes = [];
    // Group lawsuits by user
    rows.forEach(row => {
      let lawsuiteType = lawsuiteTypes.find(u => u.id === row.id);
      
      // If the user doesn't exist in the array, create a new user object
      if (!lawsuiteType) {
        lawsuiteType = { 
          id: row.id,     
          title:row.title
        };
        lawsuiteTypes.push(lawsuiteType);
      }
    });
  
    // Return the lawsuiteTypes data with posts correctly grouped
    res.json({ lawsuiteTypes });
  });
  
};


export const getLawsuiteType = (req, res) => {
  const { id } = req.params;  // Extract user ID from the request parameters

  db.all(`
    SELECT users.*, lawsuite.*
    FROM users
    LEFT JOIN lawsuite ON lawsuite.user_id = users.id
    WHERE users.id = ?
  `, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // If no user is found, return a 404 response
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Process the results
    const user = {
      id: rows[0].id,
      name: rows[0].name,
      company: rows[0].company,
      gmail: rows[0].gmail,
      phone: rows[0].phone,
      nationality: rows[0].nationality,
      address: rows[0].address,
      idCard: rows[0].idCard,
      nots: rows[0].nots,
      lawsuites: []  // Initialize an empty array for lawsuits
    };

    // Group lawsuits by user
    rows.forEach(row => {
      if (row.id) {  // row.id refers to the lawsuit's id, meaning the user has a lawsuit
        user.lawsuites.push({
          id: row.id,  // lawsuit id
          clientName: row.clientName,  // lawsuit clientName
          lawsuitType: row.lawsuitType,  // lawsuit lawsuitType
          lawsuitTitle: row.lawsuitTitle,  // lawsuit lawsuitTitle
          lawsuitNumber: row.lawsuitNumber,  // lawsuit lawsuitNumber
          courtName: row.courtName,  // lawsuit courtName
          payment: row.payment,  // lawsuit payment
          nots: row.nots,  // lawsuit nots
          ginstName: row.ginstName,
          ginstAddress: row.ginstAddress,
          ginstPhone: row.ginstPhone,
          ginstLawyer: row.ginstLawyer
        });
      }
    });

    // Return the user data with lawsuits correctly grouped
    res.json({ user });
  });
};


export const creatLeawsuiteType = (req, res) => {
  const { title } = req.body;
    console.log(title)
  if (!title) {
    return res.status(400).json({ error: 'title required' });
  }
  const stmt = db.prepare('INSERT INTO lawsuiteType (title ) VALUES (?)');
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
