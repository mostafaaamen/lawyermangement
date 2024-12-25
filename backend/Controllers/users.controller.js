// users.controller.js
import { getDb } from '../database/connect.js';
const db = getDb();
// export const getUsers = (req, res) => {
//   // أولاً، تحقق من وجود جدول 'lawsuite'
//   db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name='lawsuite'`, (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
    
//     // إذا كان الجدول موجودًا، نقوم بجلب البيانات مع الانضمام
//     if (result.length > 0) {
//       // الجدول lawsuite موجود، نواصل تنفيذ الاستعلام الأصليn
//       db.all(`
//         SELECT users.*, lawsuite.*
//         FROM users
//         LEFT JOIN lawsuite ON lawsuite.user_id = users.id
//       `, (err, rows) => {
//         if (err) {
//           return res.status(500).json({ error: err.message });
//         }
        
//         const users = [];
//         rows.forEach(row => {
//           let user = users.find(u => u.id === row.id);
//           if (!user) {
//             user = { 
//               id: row.id,
//               name: row.name,
//               company: row.company,
//               gmail: row.gmail,
//               phone: row.phone,
//               nationality: row.nationality,
//               address: row.address,
//               idCard: row.idCard,
//               nots: row.nots,
//               lawsuites: [] 
//             };
//             users.push(user);
//           }
          
//           if (row.id) {
//             user.lawsuites.push({
//               id: row.id,
//               clientName: row.clientName,
//               lawsuitType: row.lawsuitType,
//               lawsuitTitle: row.lawsuitTitle,
//               lawsuitNumber: row.lawsuitNumber,
//               courtName: row.courtName,
//               payment: row.payment,
//               nots: row.nots,
//               ginstName: row.ginstName,
//               ginstAddress: row.ginstAddress,
//               ginstPhone: row.ginstPhone,
//               ginstLawyer: row.ginstLawyer
//             });
//           }
//         });
//         res.json({ users });
//       });
//     } else {
//       // الجدول lawsuite غير موجود، استرجاع المستخدمين فقط
//       db.all(`
//         SELECT users.*
//         FROM users
//       `, (err, rows) => {
//         if (err) {
//           return res.status(500).json({ error: err.message });
//         }
        
//         const users = rows.map(row => ({
//           id: row.id,
//           name: row.name,
//           company: row.company,
//           gmail: row.gmail,
//           phone: row.phone,
//           nationality: row.nationality,
//           address: row.address,
//           idCard: row.idCard,
//           nots: row.nots,
//           lawsuites: [] // نرجع مصفوفة فارغة لأننا لن نعرض القضايا
//         }));

//         res.json({ users });
//       });
//     }
//   });
// };




export const getUsers = (req, res) => {
  // Fetch all users
  db.all(`SELECT * FROM users`, (err, usersRows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Return only users without lawsuits
    const users = usersRows.map(user => ({
      id: user.id,
      name: user.name,
      company: user.company,
      gmail: user.gmail,
      phone: user.phone,
      nationality: user.nationality,
      address: user.address,
      idCard: user.idCard,
      nots: user.nots,

    }));

    res.json({ users });
  });
};





// resopnse error 



// export const getUsers = (req, res) => {
//   db.all(`
//     SELECT users.*, lawsuite.*
//     FROM users
//     LEFT JOIN lawsuite ON lawsuite.user_id = users.id
//     WHERE lawsuite.user_id IS NOT NULL

//   `, (err, rows) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }

//     // Filter out users without associated lawsuite data
//     const users = rows.map(row => {
//       if (!row.user_id) {
//         // Exclude lawsuite data if it doesn't exist
//         const { lawsuite, ...user } = row;
//         return user;
//       }
//       return row;
//     });

//     res.json({ users });
//   });
// };

// export const getUsers = (req, res) => {
//   // Fetch all users
//   db.all(`SELECT * FROM users`, (err, usersRows) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     // Fetch all lawsuits
//     db.all(`SELECT * FROM lawsuites`, (err, lawsuitesRows) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       const users = usersRows.map(user => {
//       const userLawsuites = lawsuitesRows.filter(lawsuit => lawsuit.user_id === user.id);
//         return {
//           id: user.id,
//           name: user.name,
//           company: user.company,
//           gmail: user.gmail,
//           phone: user.phone,
//           nationality: user.nationality,
//           address: user.address,
//           idCard: user.idCard,
//           nots: user.nots,
//           lawsuites: userLawsuites.length > 0 ? userLawsuites : []  // Include lawsuits or empty array if none
//         };
//       });

//       res.json({ users });
//     });
//   });
// };

export const getUsersy = (req, res) => {
  // First, check if the 'lawsuites' table exists
  db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name='lawsuites'`, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // If the 'lawsuites' table exists, proceed with the original query
    if (result.length > 0) {
      // Perform the LEFT JOIN to fetch users with their lawsuits
      db.all(`
        SELECT users.*, lawsuites.*
        FROM users
        LEFT JOIN lawsuites ON lawsuites.user_id = users.id
      `, (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        const users = [];
        rows.forEach(row => {
          let user = users.find(u => u.id === row.id);
          
          // If the user doesn't exist in the users array, create a new user object
          if (!user) {
            user = { 
              id: row.id,
              name: row.name,
              company: row.company,
              gmail: row.gmail,
              phone: row.phone,
              nationality: row.nationality,
              address: row.address,
              idCard: row.idCard,
              nots: row.nots,
              lawsuites: [] // Initialize an empty array for lawsuits
            };
            users.push(user);
          }

          // If the row contains data for a lawsuit, add it to the user's lawsuits array
          if (row.id) {  // row.id refers to the lawsuit's id
            user.lawsuites.push({
              id: row.id || null,
              clientName: row.clientName || '',
              clientType: row.clientType || '',
              ginstName: row.ginstName || '',
              ginstAddress: row.ginstAddress || '',
              ginstPhone: row.ginstPhone || '',
              ginstLawyer: row.ginstLawyer || '',
              lawsuitType: row.lawsuitType || '',
              lawsuitTitle: row.lawsuitTitle || '',
              lawsuitNumber: row.lawsuitNumber || '',
              courtName: row.courtName || '',
              payment: row.payment || 0,
              nots: row.nots || ''
            });
          }
        });

        // Respond with the users and their lawsuits (if any)
        res.json({ users });
      });
    } else {
      // If the 'lawsuites' table doesn't exist, return users only
      db.all(`
        SELECT users.*
        FROM users
      `, (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        const users = rows.map(row => ({
          id: row.id,
          name: row.name,
          company: row.company,
          gmail: row.gmail,
          phone: row.phone,
          nationality: row.nationality,
          address: row.address,
          idCard: row.idCard,
          nots: row.nots,
          lawsuites: [] // Return an empty array for lawsuits since the table is missing
        }));

        res.json({ users });
      });
    }
  });
};

// export const getUserById = (req, res) => {
//   const { id } = req.params;  // Extract user ID from the request parameters

//   db.all(`
//     SELECT users.*, lawsuites.*
//     FROM users
//     LEFT JOIN lawsuites ON lawsuite.user_id = users.id
//     WHERE users.id = ?
//   `, [id], (err, rows) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }

//     // If no user is found, return a 404 response
//     if (rows.length === 0) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Process the results
//     const user = {
//       id: rows[0].id,
//       name: rows[0].name,
//       company: rows[0].company,
//       gmail: rows[0].gmail,
//       phone: rows[0].phone,
//       nationality: rows[0].nationality,
//       address: rows[0].address,
//       idCard: rows[0].idCard,
//       nots: rows[0].nots,
//       lawsuites: []  // Initialize an empty array for lawsuits
//     };

//     // Group lawsuits by user
//     rows.forEach(row => {
//       if (row.id) {  // row.id refers to the lawsuit's id, meaning the user has a lawsuit
//         user.lawsuites.push({
//           id: row.id,  // lawsuit id
//           clientName: row.clientName,  // lawsuit clientName
//           lawsuitType: row.lawsuitType,  // lawsuit lawsuitType
//           lawsuitTitle: row.lawsuitTitle,  // lawsuit lawsuitTitle
//           lawsuitNumber: row.lawsuitNumber,  // lawsuit lawsuitNumber
//           courtName: row.courtName,  // lawsuit courtName
//           payment: row.payment,  // lawsuit payment
//           nots: row.nots,  // lawsuit nots
//           ginstName: row.ginstName,
//           ginstAddress: row.ginstAddress,
//           ginstPhone: row.ginstPhone,
//           ginstLawyer: row.ginstLawyer
//         });
//       }
//     });

//     // Return the user data with lawsuits correctly grouped
//     res.json({ user });
//   });
// };

export const getUserById = (req, res) => {
  const userId = req.params.id;  // Get the user ID from the URL parameter

  // Fetch the user by ID
  db.all(`SELECT * FROM users WHERE id = ?`, [userId], (err, userRows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Check if the user exists
    if (userRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = userRows[0];  // There should only be one user with that ID
    // Fetch lawsuits for this user
    db.all(`SELECT * FROM lawsuites WHERE user_id = ?`, [userId], (err, lawsuitesRows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      // Return the user with lawsuits (if any)
      const result = {
        id: user.id,
        name: user.name,
        company: user.company,
        gmail: user.gmail,
        phone: user.phone,
        nationality: user.nationality,
        address: user.address,
        idCard: user.idCard,
        nots: user.nots,
        totalPayment:lawsuitesRows.reduce((sum, lawsuit) => sum + lawsuit.payment, 0),
        lawsuites: lawsuitesRows.length > 0 ? lawsuitesRows : []  // Include lawsuits or empty array if none
     
      };
      // serData.user.lawsuitesRows.reduce((sum, lawsuit) => sum + lawsuit.payment, 0);
      res.json({user:result});
    });
  });
};

export const createUser = (req, res) => {
  const { name,company, gmail, phone,nationality, address,idCard,nots } = req.body;
  // { name: "", company: "", idCard: "", phone: "", gmail: "", nationality: "", address: "", nots: "" }
  // Validate input
  if (!name || !address || !phone || !idCard) {
    return res.status(400).json({ error: 'Name, idCard, phone, and address are required' });
  }
  const stmt = db.prepare('INSERT INTO users (name,company, gmail, phone,nationality, address,idCard,nots ) VALUES (?, ?, ?, ?,?, ?, ?, ?)');
  stmt.run(name,company, gmail, phone,nationality, address,idCard,nots , function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name,company, gmail, phone,nationality, address,idCard,nots });
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
