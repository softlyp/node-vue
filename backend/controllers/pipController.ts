import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();


export const getPipPeru = async (req: any, res: any): Promise<void> => {
    try {
        const response = await axios.get('https://api.worldbank.org/pip/v1/pip?country=PER');
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        res.status(500).send('Error al obtener los datos de la API');
    }
};
