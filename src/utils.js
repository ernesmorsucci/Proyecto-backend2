import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from './config/environment.js';

export const serverRoot = dirname(fileURLToPath(import.meta.url));

//hashing functions
export function createHash(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function isValidPassword(password, hashedPassword){
  return bcrypt.compareSync(password, hashedPassword);
}

//jwt functions
export function generateToken(payload){
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '10h' });
}

export function verifyToken(token){
  return jwt.verify(token, env.JWT_SECRET);
}