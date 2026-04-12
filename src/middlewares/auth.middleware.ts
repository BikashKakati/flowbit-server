import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { customResponse } from '../utils/response';
import mongoose from 'mongoose';

export interface AuthRequest extends Request {
    user?: { id: mongoose.Types.ObjectId, email: string };
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return customResponse(res, 401, 'Unauthorized: no token provided', null, 'No valid token');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
        req.user = { id: new mongoose.Types.ObjectId(decoded.id), email: decoded.email };
        next();
    } catch (error) {
        return customResponse(res, 401, 'Unauthorized or expired token', null, 'Invalid token');
    }
};
