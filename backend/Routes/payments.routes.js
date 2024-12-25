// user routes 
import { Router } from 'express';
import { creatPaymentsClient} from '../Controllers/payments.controller.js'; 
const router = Router();
router.get('/',(req,res)=>{
    res.send({test:true})
} ); // Make sure getUsers is correctly defined
// router.get('/:id',)
router.post('/:id', creatPaymentsClient);
// router.put('/:id', );
// router.delete('/:id', );
export default router;
