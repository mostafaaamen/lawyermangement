import multer from 'multer';
import path from 'path';
import { getDb } from '../database/connect.js';
const db = getDb();
// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploadsLawsuites/'); // Save files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
  }
});

// Define allowed file types (PDF and image files)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only PDF, JPEG, PNG, and GIF are allowed.'), false); // Reject the file
  }
};

// Initialize Multer with the storage configuration and file filter
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter, // Use file filter to allow only PDF and images
  limits: { fileSize: 5 * 1024 * 1024 } // Optional: Set a file size limit (e.g., 5MB)
});

export const createFilesLawsuites = (req, res) => {
  // Use Multer middleware for file upload
  upload.single('file')(req, res, (err) => {
    if (err) {
      if (err.message === 'Invalid file type. Only PDF, JPEG, PNG, and GIF are allowed.') {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: 'File upload error', error: err });
    }

    // Extract form data and file information
    const { title, nots } = req.body;
    const { id: lawsuites_id } = req.params;
    const file = req.file; // Multer stores file info in req.file

    // Check for required fields
    if (!title || !file || !nots || !lawsuites_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    // Get current time in "YYYY-MM-DD HH:mm:ss" format
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const localTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // The file's URL is the path where it is stored on the server
    const fileUrl = `uploadsLawsuites/${file.filename}`; // Relative path to the file

    // SQL query to insert data into the database
    const query = `
      INSERT INTO files (title, url, nots, time, lawsuites_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [title, fileUrl, nots, localTime, lawsuites_id];

    // Insert data into SQLite
    db.run(query, params, function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Database error' });
      }

      return res.status(201).json({
        message: 'File uploaded and session created successfully',
        sessionId: this.lastID, // ID of the inserted session
      });
    });
  });
};
