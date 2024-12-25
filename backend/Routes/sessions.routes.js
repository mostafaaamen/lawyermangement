// user routes 
import { Router } from 'express';
import { creatNewSessions} from '../Controllers/sessions.controller.js'; // Ensure correct imports
const router = Router();
router.get('/',(req,res)=>{
    res.send({test:true})
} ); // Make sure getUsers is correctly defined
// router.get('/:id',)
router.post('/:id', creatNewSessions);
// router.put('/:id', );
// router.delete('/:id', );
export default router;
