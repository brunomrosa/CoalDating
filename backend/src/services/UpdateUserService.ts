import { getRepository } from 'typeorm';

import { compare, hash } from 'bcryptjs';
import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  email: string;
  password: string;
  name: string;
  birth: Date;
  max_age: number;
  min_age: number;
}

export default class UpdateUserService {
  public async execute({
    user_id,
    email,
    password,
    name,
    birth,
    min_age,
    max_age,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    console.log('aa');

    const user = await usersRepository.findOne({ where: { id: user_id } });

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Password does not match', 401);
    }

    user.email = email;
    user.password = await hash(password, 8);
    user.name = name;
    user.birth = birth;
    user.min_age = min_age;
    user.max_age = max_age;
    await usersRepository.save(user);
    return user;
  }
}
