import { getRepository } from 'typeorm';

import Job from '../models/Job';

import AppError from '../errors/AppError';

interface Request {
  currently_title: string;
  currently_company: string;
  id: string;
}

export default class UpdateJobService {
  public async execute({
    currently_title,
    currently_company,
    id,
  }: Request): Promise<Job> {
    const jobsRepository = getRepository(Job);

    const job = jobsRepository.findOne({ where: { id } });
    job.currently_title = currently_title;
    job.currently_company = currently_company;
    job.id = id;
    await jobsRepository.save(job);

    return job;
  }
}
