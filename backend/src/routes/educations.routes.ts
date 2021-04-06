import { Router } from 'express';
import { getRepository } from 'typeorm';
import Education from '../models/Education';
import CreateEducationService from '../services/CreateEducationService';
import UpdateEducationService from '../services/UpdateEducationService';
import ensureAuthenticate from '../middlewares/ensureAuthenticated';

const educationsRouter = Router();

educationsRouter.post('/', ensureAuthenticate, async (request, response) => {
  const createEducation = new CreateEducationService();
  request.body.user_id = request.user.id;
  console.log(request.user.id);
  const education = await createEducation.execute(request.body);

  return response.json(education);
});

educationsRouter.put('/', ensureAuthenticate, async (request, response) => {
  const updateEducation = new UpdateEducationService();
  request.body.user_id = request.user.id;
  const education = await updateEducation.execute(request.body);
  return response.json(education);
});

educationsRouter.get('/', ensureAuthenticate, async (request, response) => {
  const educationsRepository = getRepository(Education);
  const educations = await educationsRepository.findOne({
    where: { user_id: request.user.id },
  });

  return response.json(educations);
});

export default educationsRouter;
