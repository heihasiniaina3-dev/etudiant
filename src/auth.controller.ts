import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mdpss';

export class AuthController {
  login = (req: Request, res: Response): void => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
      const user = { username: 'admin', role: 'administrator' };
      const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
      return;
    }

    res.status(401).json({ message: "Identifiants incorrects" });
  };
}