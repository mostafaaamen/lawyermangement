// users.controller.js
import { getDb } from '../database/connect.js';
const db = getDb();
export const creatPaymentsClient = (req, res) => {
  const { title, payment, nots } = req.body;
  const { id:lawsuites_id } = req.params;
console.log(lawsuites_id,title, payment, nots )
  if (!title || !payment || !nots || !lawsuites_id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const currentDate = new Date();
  const year = currentDate.getFullYear();    // Get year
  const month = currentDate.getMonth() + 1;  // Get month (0-11, so add 1)
  const day = currentDate.getDate();         // Get day of the month
  const hours = currentDate.getHours();      // Get hours (0-23)
  const minutes = currentDate.getMinutes();  // Get minutes (0-59)
  const seconds = currentDate.getSeconds();  // Get seconds (0-59)
  const localTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}` // This gives time in "YYYY-MM-DDTHH:mm:ss.sssZ" format
  const query = `
    INSERT INTO payments (title, payment, nots, time, lawsuites_id)
    VALUES (?, ?, ?, ?, ?)
  `;
  const params = [title, payment, nots, localTime, lawsuites_id];
  db.run(query, params, function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'Database error' });
    }
    return res.status(201).json({
      message: 'Session created successfully',
      sessionId: this.lastID,
    });
  });
};
