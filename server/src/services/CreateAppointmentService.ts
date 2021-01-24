// ? Cada service é responsavel por apenas uma unica funcionalidade, neste caso criar um agendamento.
// ? Os services são responsáveis pela regra de negócio da aplicação
import {getCustomRepository} from 'typeorm'
import {startOfHour} from 'date-fns'; // -startOfHour pega uma o timestamp e coloca o minuto, segundo, milisegundo como zero, mantem apenas a hora
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

import  AppError from '../errors/AppError'

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  // sempre o service vai ter apenas um metodo chamado de execute ou run, que vai ser chamado para fazer o que ele foi criado para fazer
  public async execute({date, provider_id}: Request): Promise<Appointment> {

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);
    // como os dados do agendamento não são acessível fora da classe temos que acessar uma função dentro dela para verificar se a data já está agendada
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if(findAppointmentInSameDate) {
      // como os services não tem acesso ao request e ao response vamos tratar os error dessa forma:
      throw new AppError('This appointment is already booked');
    }

    // acessar o metodo da classe Appointment
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment)

    return appointment;
  }
}

export default CreateAppointmentService
