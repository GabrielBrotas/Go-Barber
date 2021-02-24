import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

// o describe cria uma categoria para o teste
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Elon Musk',
      email: 'elonmusk@gmail.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Elon Musk');
    expect(profile.email).toBe('elonmusk@gmail.com');
  });

  it('should not be able to show profile from non existent user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non existent id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
