// ? Persistência (local onde vai ficar amazenado os dados) <-> Repositório <-> Rota
// ? Repositorio é o responsável por tudo que vai mexer nos dados de alguma forma, exemplo: find, create, delete, etc..., essa pasta só é necessária se for ter algum comando especifico ex: findByDate, pois a maioria dos comando a propria entidade do typeorm ja fornece para nós
import { getRepository, Repository } from 'typeorm'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../entities/Appointment'

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }
  // toda função assincrona retorna uma promisse, dentro dessa promisse vai ser um Appointment ou null
  public async findByDate(date: Date): Promise<Appointment | undefined> {
     // verifica se a data que a pessoa quer agendar já existe algum agendamento
    const findAppointment = await this.ormRepository.findOne({
      where: { date }
    });

    return findAppointment;
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }

}

export default AppointmentsRepository
