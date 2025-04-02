import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';
import { getPipPeru } from '../controllers/pipController';

const router = Router();

router.post('/register', register);
router.post('/login', login);


router.get('/user', authMiddleware, (req, res) => {
  res.json({ message: 'Acceso autorizado', user: 'req?.user' });
});
 

export default router;
