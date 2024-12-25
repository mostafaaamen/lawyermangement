import { getDb } from '../database/connect.js';
const db = getDb();
export const createLawsuite = (req, res) => {
  const { id } = req.params;
  const { 
    clientName, clientType, ginstName, ginstAddress, ginstPhone, ginstLawyer, 
    lawsuitType, lawsuitTitle, lawsuitNumber, courtName, payment, nots 
  } = req.body;

  // Prepare the SQL insert statement
  const stmt = db.prepare(`
    INSERT INTO lawsuites (
      clientName, clientType, ginstName, ginstAddress, ginstPhone, ginstLawyer, 
      lawsuitType, lawsuitTitle, lawsuitNumber, courtName, payment, nots, user_id
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // Run the insert query
  stmt.run(
    clientName, clientType, ginstName, ginstAddress, ginstPhone, ginstLawyer, 
    lawsuitType, lawsuitTitle, lawsuitNumber, courtName, payment, nots, id, 
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      // Respond with the new lawsuit's ID
      res.status(201).json({ id: this.lastID, clientName, lawsuitTitle });
    }
  );
  // Finalize the prepared statement
  stmt.finalize();
};
export const getLawsuite = (req, res) => {
  db.all('SELECT * FROM lawsuites', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ lawsuite: rows });
  });
};
export const getLawsuitesByIdx = (req, res) => {
  const { id } = req.params;  // Getting the ID from the route parameters
  // Query to fetch the lawsuit along with related files, payments, and sessions using JOIN
  const query = `
    SELECT
      l.id AS lawsuite_id,
      l.clientName,
      l.clientType,
      l.ginstName,
      l.ginstAddress,
      l.ginstPhone,
      l.ginstLawyer,
      l.lawsuitType,
      l.lawsuitTitle,
      l.lawsuitNumber,
      l.courtName,
      l.payment AS lawsuite_payment,
      l.nots AS lawsuite_nots,
      l.time AS lawsuit_time,
      
      -- Files data
      f.id AS file_id,
      f.title AS file_title,
      f.url AS file_url,
      f.nots AS file_nots,
      f.time AS file_time,
      
      -- Payments data
      p.id AS payment_id,
      p.title AS payment_title,
      p.payment AS payment_amount,
      p.nots AS payment_nots,
      p.time AS payment_time,
      
      -- Sessions data
      s.id AS session_id,
      s.title AS session_title,
      s.date AS session_date,
      s.nots AS session_nots,
      s.time AS session_time
      
    FROM
      lawsuites l
    LEFT JOIN files f ON l.id = f.lawsuites_id
    LEFT JOIN payments p ON l.id = p.lawsuites_id
    LEFT JOIN sessions s ON l.id = s.lawsuites_id
    WHERE l.id = ?
  `;

  // Run the query
  db.all(query, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: 'Lawsuit not found or no related data' });
    }
    // Process the rows to structure the data as required
    const lawsuite = rows[0];  // Get the first row (lawsuite data)
    const files = [];
    const payments = [];
    const sessions = [];

    console.log("lawsuite",lawsuite)
    // Use a Set to avoid duplicates based on the IDs
    const fileIds = new Set();
    const paymentIds = new Set();
    const sessionIds = new Set();

    // Loop through the rows to organize files, payments, and sessions by the lawsuit ID
    rows.forEach(row => {
      if (row.file_id && !fileIds.has(row.file_id)) {
        fileIds.add(row.file_id);
        files.push({
          id: row.file_id,
          title: row.file_title,
          url: row.file_url,
          nots: row.file_nots,
          time: row.file_time
        });
      }

      if (row.payment_id && !paymentIds.has(row.payment_id)) {
        paymentIds.add(row.payment_id);
        payments.push({
          id: row.payment_id,
          title: row.payment_title,
          payment: row.payment_amount,
          nots: row.payment_nots,
          time: row.payment_time
        });
      }

      if (row.session_id && !sessionIds.has(row.session_id)) {
        sessionIds.add(row.session_id);
        sessions.push({
          id: row.session_id,
          title: row.session_title,
          date: row.session_date,
          nots: row.session_nots,
          time: row.session_time
        });
      }
    });

    // Return the organized data
    res.json({
      lawsuite: {
        id: lawsuite.lawsuite_id,
        clientName: lawsuite.clientName,
        clientType: lawsuite.clientType,
        ginstName: lawsuite.ginstName,
        ginstAddress: lawsuite.ginstAddress,
        ginstPhone: lawsuite.ginstPhone,
        ginstLawyer: lawsuite.ginstLawyer,
        lawsuitType: lawsuite.lawsuitType,
        lawsuitTitle: lawsuite.lawsuitTitle,
        lawsuitNumber: lawsuite.lawsuitNumber,
        courtName: lawsuite.courtName,
        payment: lawsuite.lawsuite_payment,
        nots: lawsuite.lawsuite_nots,
        time: lawsuite.lawsuit_time,
        user_id:111111,
        files: files,        // Attach the files array
        payments: payments,  // Attach the payments array
        sessions: sessions   // Attach the sessions array
      }
    });
  });
};
export const getLawsuitesById = (req, res) => {
  const { id } = req.params;  // Getting the ID from the route parameters
  // Query to fetch the lawsuit along with related files, payments, and sessions using JOIN
  const query = `
    SELECT
      l.id AS lawsuite_id,
      l.clientName,
      l.clientType,
      l.ginstName,
      l.ginstAddress,
      l.ginstPhone,
      l.ginstLawyer,
      l.lawsuitType,
      l.lawsuitTitle,
      l.lawsuitNumber,
      l.courtName,
      l.payment AS lawsuite_payment,
      l.nots AS lawsuite_nots,
      l.time AS lawsuit_time,
      l.user_id,  -- Include user_id in the query
      
      -- Files data
      f.id AS file_id,
      f.title AS file_title,
      f.url AS file_url,
      f.nots AS file_nots,
      f.time AS file_time,
      
      -- Payments data
      p.id AS payment_id,
      p.title AS payment_title,
      p.payment AS payment_amount,
      p.nots AS payment_nots,
      p.time AS payment_time,
      
      -- Sessions data
      s.id AS session_id,
      s.title AS session_title,
      s.date AS session_date,
      s.nots AS session_nots,
      s.time AS session_time
      
    FROM
      lawsuites l
    LEFT JOIN files f ON l.id = f.lawsuites_id
    LEFT JOIN payments p ON l.id = p.lawsuites_id
    LEFT JOIN sessions s ON l.id = s.lawsuites_id
    WHERE l.id = ?
  `;

  // Run the query
  db.all(query, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: 'Lawsuit not found or no related data' });
    }

    // Process the rows to structure the data as required
    const lawsuite = rows[0];  // Get the first row (lawsuite data)
    const files = [];
    const payments = [];
    const sessions = [];

    // Use a Set to avoid duplicates based on the IDs
    const fileIds = new Set();
    const paymentIds = new Set();
    const sessionIds = new Set();

    // Loop through the rows to organize files, payments, and sessions by the lawsuit ID
    rows.forEach(row => {
      if (row.file_id && !fileIds.has(row.file_id)) {
        fileIds.add(row.file_id);
        files.push({
          id: row.file_id,
          title: row.file_title,
          url: row.file_url,
          nots: row.file_nots,
          time: row.file_time
        });
      }

      if (row.payment_id && !paymentIds.has(row.payment_id)) {
        paymentIds.add(row.payment_id);
        payments.push({
          id: row.payment_id,
          title: row.payment_title,
          payment: row.payment_amount,
          nots: row.payment_nots,
          time: row.payment_time
        });
      }

      if (row.session_id && !sessionIds.has(row.session_id)) {
        sessionIds.add(row.session_id);
        sessions.push({
          id: row.session_id,
          title: row.session_title,
          date: row.session_date,
          nots: row.session_nots,
          time: row.session_time
        });
      }
    });

    // Return the organized data, including user_id
    res.json({
      lawsuite: {
        id: lawsuite.lawsuite_id,
        clientName: lawsuite.clientName,
        clientType: lawsuite.clientType,
        ginstName: lawsuite.ginstName,
        ginstAddress: lawsuite.ginstAddress,
        ginstPhone: lawsuite.ginstPhone,
        ginstLawyer: lawsuite.ginstLawyer,
        lawsuitType: lawsuite.lawsuitType,
        lawsuitTitle: lawsuite.lawsuitTitle,
        lawsuitNumber: lawsuite.lawsuitNumber,
        courtName: lawsuite.courtName,
        payment: lawsuite.lawsuite_payment,
        nots: lawsuite.lawsuite_nots,
        time: lawsuite.lawsuit_time,
        user_id: lawsuite.user_id,  // Include user_id
        files: files,        // Attach the files array
        payments: payments,  // Attach the payments array
        sessions: sessions   // Attach the sessions array
      }
    });
  });
};
