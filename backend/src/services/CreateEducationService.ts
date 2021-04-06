import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Education from '../models/Education';

interface Request {
  education_level: string;
  last_institution: string;
  user_id: string;
}

export default class CreateJobService {
  public async execute({
    last_institution,
    education_level,
    user_id,
  }: Request): Promise<Education> {
    const educationRepository = getRepository(Education);

    const education = educationRepository.create({
      last_institution,
      education_level,
      user_id,
    });

    await educationRepository.save(education);

    return education;
  }
}
