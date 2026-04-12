import { Router } from 'express';
import { canvasController } from '../controllers/canvas.controller';
import { catchAsync } from '../utils/catchAsync';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.use(requireAuth);

router.get('/flows/:flowId/canvas', catchAsync(canvasController.getCanvas));
router.post('/flows/:flowId/canvas', catchAsync(canvasController.saveCanvas));

export default router;
