import { Router } from 'express';
import * as lawsuiteController from '../Controllers/posts.controller.js';

const router = Router();

router.post('/:id', lawsuiteController.createLawsuite);
router.get('/', lawsuiteController.getLawsuite);
router.get('/:id', lawsuiteController.getLawsuitesById);


export default router;
