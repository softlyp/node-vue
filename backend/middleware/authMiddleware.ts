import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'supersecretkey';

interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });
    return;
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), secret);
    req.user = decoded;  
    console.log("Usuario autenticado:", req.user);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};
