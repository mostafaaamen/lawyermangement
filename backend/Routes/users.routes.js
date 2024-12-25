// user routes 
import { Router } from 'express';
import { getUsers, createUser, updateUser, deleteUser,getUserById } from '../Controllers/users.controller.js'; // Ensure correct imports
const router = Router();
router.get('/', getUsers); // Make sure getUsers is correctly defined
router.get('/:id',getUserById)
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
export default router;
