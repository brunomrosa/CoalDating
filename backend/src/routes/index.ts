import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import jobsRouter from './jobs.routes';
import educationsRouter from './educations.routes';
import filesRouter from './files.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/jobs', jobsRouter);
routes.use('/files', filesRouter);
routes.use('/educations', educationsRouter);
export default routes;
