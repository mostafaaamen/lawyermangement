import express from 'express';
import { json } from 'express';
import usersRoutes from './Routes/users.routes.js';
import postsRoutes from './Routes/post.routes.js';
import lawsuiteType from "./Routes/lawsuiteType.routes.js";
import clinetType from "./Routes/clientType.routes.js";
import session from "./Routes/sessions.routes.js";
import payments from "./Routes/payments.routes.js";
import filesLawsuites from "./Routes/filesLawsuites.routes.js";
import { initDb, getDb } from './database/connect.js';
import cors from 'cors';
import path from 'path';
// Get current directory path in ES module
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const db = getDb();  
db.run("PRAGMA foreign_keys = ON;");
const app = express();
const port = 3001;
app.use(json());
// Fixing the Content-Security-Policy header issue
app.use((req, res, next) => {
  // Fix CSP header formatting issue by writing it without using template literals.
  res.setHeader('Content-Security-Policy', "default-src 'self'; connect-src 'self' http://localhost:3001 http://127.0.0.1:3001 ws://localhost:42877;");
  next();
});
const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
};
app.use(cors(corsOptions)); 
app.use('/uploadsLawsuites', express.static(path.join(__dirname, 'uploadsLawsuites')));
initDb(); // Ensure tables are created but data is not wiped
app.use('/api/users', usersRoutes);
app.use('/api/lawsuites', postsRoutes);
app.use('/api/lawsuiteType', lawsuiteType); 
app.use('/api/clinetType', clinetType); 
app.use('/api/sessions', session);
app.use('/api/payments', payments); 
app.use('/api/filesLawsuites', filesLawsuites); 
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}/api`);
});