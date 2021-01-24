import {getRepository} from 'typeorm'
import path from 'path'
import fs from 'fs'

import uploadConfig from '../config/upload'
import User from '../models/User'

import  AppError from '../errors/AppError'

interface Request {
  user_id: string;
  avatarFileName: string
}

class UpdateUserAvatarService {
  public async execute({user_id, avatarFileName}: Request): Promise<User> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne(user_id);

    if(!user) {
      throw new AppError('Only authenticated user can change avatar', 401)
    }

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
    await usersRepository.save(user) // atualizar usuario
    return user
  }
}

export default UpdateUserAvatarService
