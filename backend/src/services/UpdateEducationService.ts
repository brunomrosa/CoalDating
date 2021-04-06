import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Education from '../models/Education';

interface Request {
  education_level: string;
  last_institution: string;
  id: string;
}

export default class UpdateJobService {
  public async execute({
    last_institution,
    education_level,
    id,
  }: Request): Promise<Education> {
    const educationRepository = getRepository(Education);

    const education = educationRepository.findOne({ where: { id } });
    education.last_institution = last_institution;
    education.education_level = education_level;
    education.id = id;

    await educationRepository.save(education);

    return education;
  }
}
