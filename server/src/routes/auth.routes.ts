import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/check', authMiddleware, authController.check);

router.post('/sign-in', authController.signIn);
router.post('/sign-up', authController.signUp);

export default router;
