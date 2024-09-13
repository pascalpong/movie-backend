import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export function createAccessToken(userId: Types.ObjectId | string): string {
    return  jwt.sign({ userId: userId.toString() }, process.env.JWT_SECRET as string, { expiresIn: '15m' });
}

export function createRefreshToken(userId: Types.ObjectId | string): string {
    return jwt.sign({ userId: userId.toString() }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' });
}

export function verifyAccessToken(token: string): jwt.JwtPayload {
    return jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
}

export function verifyRefreshToken(token: string): jwt.JwtPayload {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as jwt.JwtPayload;
}