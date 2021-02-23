import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfileService: UpdateProfileService;

// o describe cria uma categoria para o teste
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Elon Musk',
      email: 'elonmusk@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Elon Musk 2',
      email: 'elonmusk2@gmail.com',
    });

    expect(updatedUser.name).toBe('Elon Musk 2');
    expect(updatedUser.email).toBe('elonmusk2@gmail.com');
  });

  it('should not be able to update email to an existent one', async () => {
    await fakeUsersRepository.create({
      name: 'Elon Musk',
      email: 'elonmusk@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Warren Buffet',
      email: 'warrenbuffet@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Warren Buffet',
        email: 'elonmusk@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Elon Musk',
      email: 'elonmusk@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Elon Musk 2',
      email: 'elonmusk2@gmail.com',
      old_password: '123456',
      password: '1234567',
    });

    expect(updatedUser.password).toBe('1234567');
  });

  it('should not be able to update password without oldpassword', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Elon Musk',
      email: 'elonmusk@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Elon Musk 2',
        email: 'elonmusk2@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password with wrong oldpassword', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Elon Musk',
      email: 'elonmusk@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Elon Musk 2',
        email: 'elonmusk2@gmail.com',
        old_password: 'wrong-old-password',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
