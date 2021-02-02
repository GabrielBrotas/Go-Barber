import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

// o describe cria uma categoria para o teste
describe('CreateAppointment', () => {
  // it = isso ou isto, é igual ao teste
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  })

  it('should not be able to create two appointments in same date', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointmentDate = new Date();

    const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123123',
    });

    // esperamos o código retorne um erro que seja da instancia de um Error geral do JS ou do nosso personalizado
    expect(createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123123',
    })).rejects.toBeInstanceOf(AppError)
  })
})
