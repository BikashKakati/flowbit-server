import { Request, Response } from 'express';
import { canvasService } from '../services/canvas.service';
import { customResponse } from '../utils/response';
import { AuthRequest } from '../middlewares/auth.middleware';

export const canvasController = {
    async getCanvas(req: AuthRequest, res: Response) {
        const userId = req.user?.id.toString() as string;
        const flowId = req.params.flowId as string;
        const result = await canvasService.getCanvas(userId, flowId);
        customResponse(res, 200, 'Canvas snapshot retrieved', result);
    },

    async saveCanvas(req: AuthRequest, res: Response) {
        const userId = req.user?.id.toString() as string;
        const flowId = req.params.flowId as string;
        const result = await canvasService.saveCanvas(userId, flowId, req.body);
        customResponse(res, 200, 'Canvas snapshot saved', result);
    }
};
