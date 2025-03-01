import { Router } from 'express';
import * as recordsController from '../controllers/records.controller';

const router = Router();

router.get('/', recordsController.get);

export default router;
