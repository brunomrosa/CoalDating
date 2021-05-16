import { getRepository } from 'typeorm';

import Like from '../models/Like';

import AppError from '../errors/AppError';

interface Request {
  user_one: string;
  user_two: string;
  user: { id: string };
}

export default class CreateLikeService {
  public async execute({
    user_one,
    user_two,
    user,
  }: Request): Promise<Like | boolean> {
    const likesRepository = getRepository(Like);

    const verifyIfLikeAlreadyExists = await likesRepository.findOne({
      where: [{ user_one: user.id }, { user_two: user.id }],
    });
    console.log(verifyIfLikeAlreadyExists);
    if (verifyIfLikeAlreadyExists) {
      if (
        user.id === verifyIfLikeAlreadyExists.user_one &&
        !verifyIfLikeAlreadyExists.user_two_liked
      ) {
        return false;
      }

      if (
        user.id === verifyIfLikeAlreadyExists.user_two &&
        !verifyIfLikeAlreadyExists.user_two_liked
      ) {
        verifyIfLikeAlreadyExists.user_two_liked = true;
        likesRepository.save(verifyIfLikeAlreadyExists);
        return true;
      }
      return true;
    }
    const like = likesRepository.create({
      user_one,
      user_two,
      user_one_liked: true,
    });

    await likesRepository.save(like);

    return like;
  }
}
