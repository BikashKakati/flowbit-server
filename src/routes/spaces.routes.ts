import { Router } from 'express';
import { spacesController } from '../controllers/spaces.controller';
import { catchAsync } from '../utils/catchAsync';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.use(requireAuth); // All space routes require auth

router.get('/', catchAsync(spacesController.getSpaces));
router.post('/', catchAsync(spacesController.createSpace));
router.put('/:spaceId', catchAsync(spacesController.updateSpace));
router.delete('/:spaceId', catchAsync(spacesController.deleteSpace));

export default router;
