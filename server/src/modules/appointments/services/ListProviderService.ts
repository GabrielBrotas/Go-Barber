import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

    if (!users) {
      users = await this.usersRepository.findAllProvider({
        except_user_id: user_id,
      });

      // o cache vai ser diferente para cada usuario pois na lista de users não deve conter o proprio que esta fazendo a requisição
      // o ':' no redis é uma subnivel de providers-list
      await this.cacheProvider.save(`providers-list:${user_id}`, users);
      // na primeira query do get providers vai ser executada em torno de 40ms, depois de salvo no redis o cache quando realizarmos a query de novo vai ser feita em torno de 5ms pois vai estar salvo em cache.
    }

    return users;
  }
}

export default ListProviderService;
