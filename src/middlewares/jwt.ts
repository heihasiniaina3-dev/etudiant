import jwt from 'jsonwebtoken';
import { AuthenticatedUser } from '../models/User.js';

export const JWT_SECRET = 'votre_cle_secrete_super_securisee'; // <-- Ajout de "export" ici

export function generateAccessToken(payload: AuthenticatedUser): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyAccessToken(token: string): AuthenticatedUser {
  return jwt.verify(token, JWT_SECRET) as AuthenticatedUser;
}