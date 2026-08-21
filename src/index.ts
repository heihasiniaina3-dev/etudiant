import express from 'express';
import { EtudiantController } from './controller.js';
import { AuthController } from './auth.controller.js';
import { authenticate } from './middlewares/auth.middleware.js';

const app = express();
app.use(express.json());

const controller = new EtudiantController();
const authController = new AuthController();

app.post('/login', authController.login);

app.get('/students', authenticate, controller.getAll);
app.get('/students/:id', authenticate, controller.getById);
app.post('/students', authenticate, controller.create);
app.delete('/students/:id', authenticate, controller.delete);

export default app;