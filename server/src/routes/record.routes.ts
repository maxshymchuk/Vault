import { Router } from 'express';
import * as recordsController from '../controllers/records.controller';

const router = Router();

router.post('/add', recordsController.add);

router.put('/update', recordsController.update);

router.delete('/remove', recordsController.remove);

export default router;
