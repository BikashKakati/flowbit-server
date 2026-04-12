import { Router } from 'express';
import { flowsController } from '../controllers/flows.controller';
import { catchAsync } from '../utils/catchAsync';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.use(requireAuth);

// Note: In the design plan we had GET /api/spaces/:spaceId/flows and POST /api/spaces/:spaceId/flows, and PUT/DELETE on /api/flows/:flowId
// Here we map those structure as a unified file, we might be mounting it differently in server.ts
// E.g. mounting this router at /api
router.get('/spaces/:spaceId/flows', catchAsync(flowsController.getFlows));
router.post('/spaces/:spaceId/flows', catchAsync(flowsController.createFlow));

router.put('/flows/:flowId/name', catchAsync(flowsController.updateFlowName));
router.delete('/flows/:flowId', catchAsync(flowsController.deleteFlow));

export default router;
