import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { customResponse } from '../utils/response';
import { AuthRequest } from '../middlewares/auth.middleware';

export const authController = {
    async signup(req: Request, res: Response) {
        const result = await authService.signup(req.body);
        customResponse(res, 201, 'User created successfully', result);
    },

    async login(req: Request, res: Response) {
        const result = await authService.login(req.body);
        customResponse(res, 200, 'Login successful', result);
    },

    async getProfile(req: AuthRequest, res: Response) {
        const userId = req.user?.id.toString() as string;
        const result = await authService.getProfile(userId);
        customResponse(res, 200, 'Profile retrieved', result);
    },

    async updateProfile(req: AuthRequest, res: Response) {
        const userId = req.user?.id.toString() as string;
        const result = await authService.updateProfile(userId, req.body);
        customResponse(res, 200, 'Profile updated', result);
    }
};
