// ? Persistência (local onde vai ficar amazenado os dados) <-> Repositório <-> Rota
// ? Repositorio é o responsável por tudo que vai mexer nos dados de alguma forma, exemplo: find, create, delete, etc..., essa pasta só é necessária se for ter algum comando especifico ex: findByDate, pois a maioria dos comando a propria entidade do typeorm ja fornece para nós
import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthProviderDTO from '@modules/appointments/dtos/IFindAllInMonthProviderDTO';
import IFindAllInDayProviderDTO from '@modules/appointments/dtos/IFindAllInDayProviderDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  // toda função assincrona retorna uma promisse, dentro dessa promisse vai ser um Appointment ou null
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    // verifica se a data que a pessoa quer agendar já existe algum agendamento
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthProviderDTO): Promise<Appointment[]> {
    // Vamos formatar o mes pois a função to-char do postgres vai retornar o mes no formato MM (05)
    // padStart =se o numero não tiver dois digitos eu quero que preencha a esquerda com 0
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        // o postgres pode alterar o nome do campo da query para não ter chance de haver algum campo duplicado e ele bugar dentro do sistema, então passando como função vamos pegar o valor exato desse campo
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ), // to_char é uma função do postgres que vai formatar o valor para uma string
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayProviderDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ), // to_char é uma função do postgres que vai formatar o valor para uma string
      },
    });

    return appointments;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
