/* eslint-disable no-await-in-loop */
/* eslint-disable no-var */
import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import UpdateUserService from '../services/UpdateUserService';
import User from '../models/User';
import CalculateDistanceService from '../services/CalculateDistanceService';
import UpdateLikeOrDislike from '../services/UpdateLikeOrDeslike';
import FindValidUserService from '../services/FindValidUserService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', ensureAuthenticated, async (request, response) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    where: { id: request.user.id },
  });
  delete user?.password;
  return response.json(user);
});

usersRouter.get('/find', ensureAuthenticated, async (request, response) => {
  const findUser = new FindValidUserService();
  const user = await findUser.execute(request.user);
  delete user.user.password;
  return response.json(user);
});

usersRouter.post('/', async (request, response) => {
  const createUser = new CreateUserService();

  const user = await createUser.execute(request.body);

  delete user.password;

  return response.json(user);
});
usersRouter.put('/', ensureAuthenticated, async (request, response) => {
  const updateUser = new UpdateUserService();

  request.body.user_id = request.user.id;
  const user = await updateUser.execute(request.body);
  delete user.password;
  return response.json(user);
});

usersRouter.put('/cords', ensureAuthenticated, async (request, response) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    where: { id: request.user.id },
  });

  user.lat = request.body.lat;
  user.lon = request.body.lon;

  await userRepository.save(user);
  delete user.password;
  return response.json(user);
});

usersRouter.put('/list', ensureAuthenticated, async (request, response) => {
  const updateList = new UpdateLikeOrDislike();

  request.body.user_id = request.user.id;
  const user = await updateList.execute(request.body);
  delete user.password;
  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();
      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });
      delete user.password;

      return response.json(user);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  },
);

export default usersRouter;
