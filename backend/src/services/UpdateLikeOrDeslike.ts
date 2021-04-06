import { getRepository } from 'typeorm';

import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  likes?: string[];
  dislikes?: string[];
}

export default class UpdateLikeOrDislike {
  public async execute({ user_id, likes, dislikes }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { id: user_id } });

    if (!user) {
      throw new AppError(
        'Only authenticated users can updated their lists',
        401,
      );
    }
    if (likes) {
      user.likes = likes;
    }
    if (dislikes) {
      user.dislikes = dislikes;
    }

    await usersRepository.save(user);
    return user;
  }
}
