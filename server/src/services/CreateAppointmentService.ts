// ? Cada service é responsavel por apenas uma unica funcionalidade, neste caso criar um agendamento.
// ? Os services são responsáveis pela regra de negócio da aplicação
import {startOfHour} from 'date-fns' // -startOfHour pega uma o timestamp e coloca o minuto, segundo, milisegundo como zero, mantem apenas a hora
import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface Request {
  provider: string;
  date: Date;
}

/*
  * [x] Recebimento das informações
  * [x] Tratativa de erros/excessões
  * [x] Acesso ao repositório
*/

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository
  }

  // sempre o service vai ter apenas um metodo chamado de execute ou run, que vai ser chamado para fazer o que ele foi criado para fazer
  public execute({date, provider}: Request): Appointment {
    const appointmentDate = startOfHour(date);
    // como os dados do agendamento não são acessível fora da classe temos que acessar uma função dentro dela para verificar se a data já está agendada
    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate)

    if(findAppointmentInSameDate) {
      // como os services não tem acesso ao request e ao response vamos tratar os error dessa forma:
      throw Error('This appointment is already booked')
    }

    // acessar o metodo da classe Appointment
    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    })

    return appointment
  }
}

export default CreateAppointmentService
