/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { getRepository } from 'typeorm';
import faker from 'faker/locale/pt_BR';
import axios from 'axios';
import Education from '../models/Education';
import File from '../models/File';
import Job from '../models/Job';
import User from '../models/User';

export default class FakerService {
  public async execute(howManyToCreate: number) {
    let i = 0;
    while (i != howManyToCreate) {
      const userRepository = getRepository(User);
      const jobRepository = getRepository(Job);
      const fileRepository = getRepository(File);
      const educationRepository = getRepository(Education);

      const likes = [];
      const dislikes = [];

      while (likes.length < 5) {
        likes.push(faker.random.word());
      }

      while (dislikes.length < 5) {
        dislikes.push(faker.random.word());
      }

      const user = await userRepository.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        birth: faker.date.between('01-01-1970', '01-01-2003'),
        lat: faker.address.latitude(-17.7316752, -32.7316752),
        lon: faker.address.longitude(-39.8215121, -55.4944496),
        likes,
        dislikes,
        min_age: Math.floor(Math.random() * 50),
        max_age: Math.floor(Math.random() * 80),
      });
      await userRepository.save(user);

      const job = await jobRepository.create({
        currently_company: faker.company.companyName(),
        currently_title: faker.name.jobTitle(),
        area: faker.name.jobArea(),
        user_id: user.id,
      });
      await jobRepository.save(job);

      const getRandomInstitution = await axios.get(
        'http://universities.hipolabs.com/search',
      );
      const last_institution =
        getRandomInstitution.data[Math.floor(Math.random() * 100)];

      const education = educationRepository.create({
        last_institution: last_institution.name,
        education_level: 'Degree',
        area: faker.name.jobArea(),
        user_id: user.id,
        course: faker.random.word(),
      });
      await educationRepository.save(education);

      const files = [];
      while (files.length < 5) {
        const file = await fileRepository.create({
          url: faker.image.avatar(),
          path: faker.image.avatar(),
          user: user.id,
          name: faker.system.fileName(),
        });
        await fileRepository.save(file);
        files.push(file);
      }

      console.log(i);
      i++;
    }

    return true;
  }
}
