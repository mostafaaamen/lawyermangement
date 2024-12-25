// user routes 
import { Router } from 'express';
import { getClientType,getClientTypes,creatClientType} from '../Controllers/clientType.controller.js'; // Ensure correct imports
const router = Router();
router.get('/', getClientTypes); 
router.get('/:id',getClientType)
router.post('/', creatClientType);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);
export default router;
