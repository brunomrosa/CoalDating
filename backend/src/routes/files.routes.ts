import { response, Router } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';
import File from '../models/File';
import AppError from '../errors/AppError';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const filesRouter = Router();
const upload = multer(uploadConfig);
filesRouter.get('/', ensureAuthenticated, async (request, response) => {
  const FileRepository = getRepository(File);
  const files = await FileRepository.find({
    relations: ['user'],
    where: {
      user: request.user.id,
    },
  });
  return response.json(files);
});

filesRouter.delete('/:name', ensureAuthenticated, async (request, response) => {
  const FileRepository = getRepository(File);

  const file = await FileRepository.findOne({
    relations: ['user'],
    where: {
      name: request.params.name,
    },
  });

  if (!file) {
    return response.status(400).json({ message: 'File not found' });
  }
  if (file.user.id !== request.user.id) {
    return response.status(400).json({ message: 'You are not the owner!' });
  }
  fs.promises.unlink(file.path);
  await FileRepository.remove(file);

  return response.json({ message: 'Success' });
});

filesRouter.post(
  '/',
  upload.single('file'),
  ensureAuthenticated,
  async (request, response) => {
    const FileRepository = getRepository(File);
    const { filename } = request.file;
    const baseUrl = `http://localhost:3333/files/`;
    const doc = await FileRepository.create({
      url: baseUrl + filename,
      path: path.join(uploadConfig.directory, filename),
      user: request.user.id,
      name: filename,
    });

    FileRepository.save(doc);

    return response.json(doc);
  },
);

export default filesRouter;
