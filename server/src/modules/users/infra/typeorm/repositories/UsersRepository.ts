// ? Persistência (local onde vai ficar amazenado os dados) <-> Repositório <-> Rota
// ? Repositorio é o responsável por tudo que vai mexer nos dados de alguma forma, exemplo: find, create, delete, etc..., essa pasta só é necessária se for ter algum comando especifico ex: findByDate, pois a maioria dos comando a propria entidade do typeorm ja fornece para nós
import { getRepository, Repository } from 'typeorm'

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User'

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email }
    });
    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

}

export default UsersRepository;
