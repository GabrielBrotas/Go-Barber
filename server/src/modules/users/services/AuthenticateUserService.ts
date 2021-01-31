import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign  } from 'jsonwebtoken'

import  AppError from '@shared/errors/AppError'
import authConfig from '@config/auth'

import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService{
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({email, password}: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError("Invalid Email/Password combination.", 401);
    };

    if(!user.password) throw new AppError("Invalid Password", 400);

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new AppError("Invalid Email/Password combination.", 401);
    };

    const {secret, expiresIn} = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id, // id do usuario
      expiresIn //tempo de duração do token
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
