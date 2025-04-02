import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import * as dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET || 'secretkey';

interface UserCredentials {
    username: string;
    password: string;
}

export const register = async (req: any, res: any): Promise<void> => {
    const {username, password}: UserCredentials = req.body;
    try {
      if (!username.trim() || !password.trim()) {
        return res.status(400).json({ error: 'Completa los campos' });  
      }

      const existingUser = await User.findOne(username);
      if (existingUser) {
        return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.createUser({username, password: hashedPassword});
        res.status(201).json({message: 'Usuario registrado'});
    } catch (error) {
        res.status(500).json({error: 'Error al registrar'});
    }
};

export const login = async (req: any, res: any): Promise<void> => {
    const {username, password}: UserCredentials = req.body;
    const user = await User.getUserByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({id: user.id}, secret, {expiresIn: '1h'});
        res.json({token});
    } else {
        res.status(401).json({error: 'Credenciales incorrectas'});
    }
};
