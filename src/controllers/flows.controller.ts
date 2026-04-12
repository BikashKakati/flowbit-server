import { Request, Response } from 'express';
import { flowsService } from '../services/flows.service';
import { customResponse } from '../utils/response';
import { AuthRequest } from '../middlewares/auth.middleware';

export const flowsController = {
    async getFlows(req: AuthRequest, res: Response) {
        const userId = req.user?.id.toString() as string;
        const spaceId = req.params.spaceId as string;
        const result = await flowsService.getFlows(userId, spaceId);
        customResponse(res, 200, 'Flows retrieved', result);
    },

    async createFlow(req: AuthRequest, res: Response) {
        const userId = req.user?.id.toString() as string;
        const spaceId = req.params.spaceId as string;
        const result = await flowsService.createFlow(userId, spaceId, req.body);
        customResponse(res, 201, 'Flow created', result);
    },

    async updateFlowName(req: AuthRequest, res: Response) {
        const userId = req.user?.id.toString() as string;
        const flowId = req.params.flowId as string;
        const result = await flowsService.updateFlowName(userId, flowId, req.body);
        customResponse(res, 200, 'Flow updated', result);
    },

    async deleteFlow(req: AuthRequest, res: Response) {
        const userId = req.user?.id.toString() as string;
        const flowId = req.params.flowId as string;
        const result = await flowsService.deleteFlow(userId, flowId);
        customResponse(res, 200, 'Flow deleted', result);
    }
};
