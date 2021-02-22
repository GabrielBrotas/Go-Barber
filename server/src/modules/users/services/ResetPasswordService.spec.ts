import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

// não vamos criar uma nova instancia com o 'new' para não criar os repositorios compartilhados, sempre que for chamado deve ser criado um novo pois os testes não podem compartilhar informações
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

// o describe cria uma categoria para o teste
describe('ResetPassword', () => {
  // função que vai ser executada antes de cada teste.
  beforeEach(() => {
    // criar uma nova instancia dessas classes sempre que alguma função for chamada.
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  // it = isso ou isto, é igual ao teste
  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Elon Musk',
      email: 'elonmusk@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      token,
      password: '1234567',
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('1234567');
    expect(updatedUser?.password).toBe('1234567');
  });

  it('should not be able to reset password with non existent token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non existent token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password with non existent user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existent-user',
    );

    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password after 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Elon Musk',
      email: 'elonmusk@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    // sempre que a função Date.now() for executada pelos testes o mockImprementationOnce vai executar o nosso código ao inves da função, assim vamos retornar 3 horas no futuro para comparar com atual que o token foi criado
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        token,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
