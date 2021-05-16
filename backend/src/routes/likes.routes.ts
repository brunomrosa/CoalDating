import { Router } from 'express';
import CreateLikeService from '../services/CreateLikeService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const likesRouter = Router();

likesRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { user_one, user_two } = request.body;
  const createLikeService = new CreateLikeService();

  const res = await createLikeService.execute({
    user_one,
    user_two,
    user: request.user,
  });

  return response.json(res);
});

export default likesRouter;
