import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import pipRoutes from "./routes/pipRoutes";
 
const app = express();

const corsOptions = {
    origin: process.env.URL_FRONT,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
app.use(express.json());
app.use(cors(corsOptions));
app.use('/auth', authRoutes);
app.use('/pip', pipRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en:${PORT}`));
 