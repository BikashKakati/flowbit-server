import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

import authRoutes from './routes/auth.routes';
import spacesRoutes from './routes/spaces.routes';
import flowsRoutes from './routes/flows.routes';
import canvasRoutes from './routes/canvas.routes';


app.use('/api', authRoutes);
app.use('/api/spaces', spacesRoutes);
app.use('/api', flowsRoutes);
app.use('/api', canvasRoutes);

app.use(errorHandler);

export default app;