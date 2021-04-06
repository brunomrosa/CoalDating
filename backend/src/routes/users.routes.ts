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

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', ensureAuthenticated, async (request, response) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    where: { id: request.user.id },
  });
  return response.json(user);
});

usersRouter.get('/find', ensureAuthenticated, async (request, response) => {
  const userRepository = await getRepository(User);
  const yourself = await userRepository.findOne({
    where: { id: request.user.id },
  });

  const findUser = async () => {
    const user = await getRepository(User)
      .createQueryBuilder('user')
      .orderBy('RANDOM()')
      .getOne();
    const yourself = await userRepository.findOne({
      where: { id: request.user.id },
    });

    const arr = [yourself, user];
    const distance = await CalculateDistanceService.execute(arr);
    return { user, distance };
  };

  var userValid = await findUser();
  console.log(userValid.distance);
  while (
    userValid.distance > yourself.max_distance ||
    userValid.user.id == yourself.id
  ) {
    userValid = await findUser();
  }

  return response.json(userValid);
});

usersRouter.post('/', async (request, response) => {
  const createUser = new CreateUserService();

  const { name, email, password } = request.body;
  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});
usersRouter.put('/', ensureAuthenticated, async (request, response) => {
  const updateUser = new UpdateUserService();

  request.body.user_id = request.user.id;
  const user = await updateUser.execute(request.body);

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
  return response.json(user);
});

usersRouter.put('/list', ensureAuthenticated, async (request, response) => {
  const updateList = new UpdateLikeOrDislike();

  request.body.user_id = request.user.id;
  const user = await updateList.execute(request.body);

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
