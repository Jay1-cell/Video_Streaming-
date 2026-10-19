/**
 * CourseHub — API Routes Index
 */

import { Router } from 'express';
import healthRoutes from './health.routes.js';
import videoRoutes from './video.routes.js';

const apiRouter = Router();

apiRouter.use('/health', healthRoutes);
apiRouter.use('/videos', videoRoutes);

export default apiRouter;
