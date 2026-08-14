import express from 'express';
import { EtudiantController } from './controller.js';

const app = express();
app.use(express.json());

const controller = new EtudiantController();

app.get('/students', controller.getAll);
app.get('/students/:id', controller.getById);
app.post('/students', controller.create);
app.delete('/students/:id', controller.delete);

export default app;