import { Request, Response } from 'express';
import { spacesService } from '../services/spaces.service';
import { customResponse } from '../utils/response';
import { AuthRequest } from '../middlewares/auth.middleware';

export const spacesController = {
    async getSpaces(req: AuthRequest, res: Response) {
        const userId = req.user?.id.toString() as string;
        const result = await spacesService.getSpaces(userId);
        customResponse(res, 200, 'Spaces retrieved', result);
    },

    async createSpace(req: AuthRequest, res: Response) {
        const userId = req.user?.id.toString() as string;
        const result = await spacesService.createSpace(userId, req.body);
        customResponse(res, 201, 'Space created', result);
    },

    async updateSpace(req: AuthRequest, res: Response) {
        const userId = req.user?.id.toString() as string;
        const spaceId = req.params.spaceId as string;
        const result = await spacesService.updateSpace(userId, spaceId, req.body);
        customResponse(res, 200, 'Space updated', result);
    },

    async deleteSpace(req: AuthRequest, res: Response) {
        const userId = req.user?.id.toString() as string;
        const spaceId = req.params.spaceId as string;
        const result = await spacesService.deleteSpace(userId, spaceId);
        customResponse(res, 200, 'Space deleted', result);
    }
};
