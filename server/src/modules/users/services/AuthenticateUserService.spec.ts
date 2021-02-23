import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

// o describe cria uma categoria para o teste
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  // it = isso ou isto, é igual ao teste
  it('should be able to authenticate', async () => {
    // Um teste não pode depender de outro então vamos criar um novo usuário
    const user = await createUser.execute({
      name: 'Elon Musk',
      email: 'elonmusk@gmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'elonmusk@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existent user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'elonmusk@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate user with wrong password', async () => {
    // Um teste não pode depender de outro então vamos criar um novo usuário
    await createUser.execute({
      name: 'Elon Musk',
      email: 'elonmusk@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'elonmusk@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
