import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
  birth: Date;
}

export default class CreateUserService {
  public async execute({
    name,
    email,
    password,
    birth,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const checkUserExists = await usersRepository.findOne({ where: { email } });

    if (checkUserExists) {
      throw new AppError('Email adress already used');
    }

    const user = usersRepository.create({
      name,
      email,
      birth,
      password: await hash(password, 8),
    });

    await usersRepository.save(user);

    return user;
  }
}
