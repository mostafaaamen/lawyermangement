// user routes 
import { Router } from 'express';
import { getLawsuiteTypes,getLawsuiteType,creatLeawsuiteType} from '../Controllers/lawsuiteType.controller.js'; // Ensure correct imports
const router = Router();
router.get('/', getLawsuiteTypes); 
router.get('/:id',getLawsuiteType)
router.post('/', creatLeawsuiteType);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);
export default router;
