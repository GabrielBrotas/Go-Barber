// ? Cada service é responsavel por apenas uma unica funcionalidade, neste caso criar um agendamento.
// ? Os services são responsáveis pela regra de negócio da aplicação
import { startOfHour } from 'date-fns'; // -startOfHour pega uma o timestamp e coloca o minuto, segundo, milisegundo como zero, mantem apenas a hora
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

// informar que a classe possui conteudo injetavel/array de dependencias
@injectable()
class CreateAppointmentService {
  constructor(
    // injetar o repositório criado no container
    // a partir de agora o service depende da interface e não do repositorio em si
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository, // o private vai automaticamente criar a variavel appointmentsRepository ao inves de definir ela no topo e usar o this.appointmentsRepository = appointmentsRepository;
  ) {}

  // sempre o service vai ter apenas um metodo chamado de execute ou run, que vai ser chamado para fazer o que ele foi criado para fazer
  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    // como os dados do agendamento não são acessível fora da classe temos que acessar uma função dentro dela para verificar se a data já está agendada
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      // como os services não tem acesso ao request e ao response vamos tratar os error dessa forma:
      throw new AppError('This appointment is already booked');
    }

    // acessar o metodo da classe Appointment
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
