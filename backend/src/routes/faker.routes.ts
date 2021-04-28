import { Router } from 'express';

import FakerService from '../services/FakerService';
import ensureAuthenticate from '../middlewares/ensureAuthenticated';

const fakerRouter = Router();

fakerRouter.get('/', async (request, response) => {
  const fakerService = new FakerService();

  const faker = await fakerService.execute(1000);

  return response.json({ message: 'ok' });
});

export default fakerRouter;
