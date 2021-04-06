import { Router } from 'express';
import { getRepository } from 'typeorm';
import Job from '../models/Job';
import CreateJobService from '../services/CreateJobService';
import ensureAuthenticate from '../middlewares/ensureAuthenticated';
import UpdateJobService from '../services/UpdateJobService';

const jobsRouter = Router();

jobsRouter.post('/', ensureAuthenticate, async (request, response) => {
  const createJob = new CreateJobService();
  request.body.user_id = request.user.id;
  const job = createJob.execute(request.body);

  return response.json(job);
});

jobsRouter.put('/', ensureAuthenticate, async (request, response) => {
  const updateJob = new UpdateJobService();
  request.body.user_id = request.user.id;
  const job = await updateJob.execute(request.body);

  return response.json(job);
});

jobsRouter.get('/', ensureAuthenticate, async (request, response) => {
  const jobsRepository = getRepository(Job);
  const job = await jobsRepository.findOne({
    where: { user_id: request.user.id },
  });

  return response.json(job);
});

export default jobsRouter;
