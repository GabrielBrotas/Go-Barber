import { inject, injectable } from 'tsyringe';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';

import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  avatarFileName: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({user_id, avatarFileName}: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if(!user) {
      throw new AppError('Only authenticated user can change avatar', 401);
    };

    if(user.avatar) {
      // deletar avatar anterior
      // pegar endereço
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      // essa função checa se o arquvo existe
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if(userAvatarFileExists){
        // deletar arquivo
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;
    await this.usersRepository.save(user); // atualizar usuario
    return user;
  }
}

export default UpdateUserAvatarService
