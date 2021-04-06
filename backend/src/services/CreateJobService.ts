import { getRepository } from 'typeorm';

import Job from '../models/Job';

import AppError from '../errors/AppError';

interface Request {
  currently_title: string;
  currently_company: string;
  user_id: string;
}

export default class CreateJobService {
  public async execute({
    currently_title,
    currently_company,
    user_id,
  }: Request): Promise<Job> {
    const jobsRepository = getRepository(Job);

    const job = jobsRepository.create({
      currently_title,
      currently_company,
      user_id,
    });

    await jobsRepository.save(job);

    return job;
  }
}
