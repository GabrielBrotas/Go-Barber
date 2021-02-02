import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';

// o describe cria uma categoria para o teste
describe('AuthenticateUser', () => {
  // it = isso ou isto, é igual ao teste
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    // Um teste não pode depender de outro então vamos criar um novo usuário
    const user = await createUser.execute({
      name: 'Elon Musk',
      email: 'elonmusk@gmail.com',
      password: '123456'
    });

    const response = await authenticateUser.execute({
      email: 'elonmusk@gmail.com',
      password: '123456'
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  })

  it('should not be able to authenticate with non existent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(
      authenticateUser.execute({
        email: 'elonmusk@gmail.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to authenticate user with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    // Um teste não pode depender de outro então vamos criar um novo usuário
    await createUser.execute({
      name: 'Elon Musk',
      email: 'elonmusk@gmail.com',
      password: '123456'
    });

    expect(
      authenticateUser.execute({
        email: 'elonmusk@gmail.com',
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(AppError);
  })
})
