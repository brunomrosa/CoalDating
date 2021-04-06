/* eslint-disable no-await-in-loop */
import { getRepository } from 'typeorm';

import User from '../models/User';
import Job from '../models/Job';
import Education from '../models/Education';
import AppError from '../errors/AppError';
import CalculateDistanceService from './CalculateDistanceService';

interface Request {
  id: string;
}
interface Response {
  user: User;
  job: Job;
  education: Education;
}
export default class FindValidUser {
  public async execute({ id }: Request): Promise<Response> {
    const userRepository = getRepository(User);
    const jobRepository = getRepository(Job);
    const educationRepository = getRepository(Education);

    const yourself = await userRepository.findOne({
      where: { id },
    });
    const findUser = async () => {
      const user = await getRepository(User)
        .createQueryBuilder('user')
        .orderBy('RANDOM()')
        .getOne();

      const arr = [yourself, user];
      const distance = await CalculateDistanceService.execute(arr);
      return { user, distance };
    };

    let userValid = await findUser();

    while (
      userValid.distance > yourself.max_distance ||
      userValid.user.id == yourself.id
    ) {
      userValid = await findUser();
    }
    userValid.job = await jobRepository.findOne({ where: { user_id: id } });
    userValid.education = await educationRepository.findOne({
      where: { user_id: id },
    });

    return userValid;
  }
}
