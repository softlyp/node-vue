import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getPipPeru } from '../controllers/pipController';

const router = Router();
 
router.get('/data/peru', authMiddleware, getPipPeru);

export default router;
