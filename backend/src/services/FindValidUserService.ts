/* eslint-disable no-await-in-loop */
import { getRepository } from 'typeorm';

import User from '../models/User';
import Job from '../models/Job';
import Education from '../models/Education';
import AppError from '../errors/AppError';
import CalculateDistanceService from './CalculateDistanceService';
import File from '../models/File';

interface Request {
  id: string;
}
interface Response {
  user: User;
  job: Job;
  education: Education;
  age: number;
}
export default class FindValidUser {
  public async execute({ id }: Request): Promise<Response> {
    const userRepository = getRepository(User);
    const jobRepository = getRepository(Job);
    const fileRepository = getRepository(File);
    const educationRepository = getRepository(Education);

    async function getAge(dateString: Date) {
      const today = new Date();
      const birthDate = new Date(dateString);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age;
    }

    const yourself = await userRepository.findOne({
      where: { id },
    });
    // yourself.age = await getAge(yourself?.birth);

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
    const photos = await fileRepository.find({
      where: { user: userValid.user?.id },
    });

    if (photos.length >= 1) {
      userValid.user.photos = photos;
    }
    userValid.user.age = await getAge(userValid.user.birth);

    userValid.job = await jobRepository.findOne({
      where: { user_id: userValid.user.id },
    });
    userValid.education = await educationRepository.findOne({
      where: { user_id: userValid.user.id },
    });

    return userValid;
  }
}
