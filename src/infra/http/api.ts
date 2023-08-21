import express from 'express';
import router from './routes/cards.routes';

const api = express();
api.use(express.json());
api.use(router);

export default api;
