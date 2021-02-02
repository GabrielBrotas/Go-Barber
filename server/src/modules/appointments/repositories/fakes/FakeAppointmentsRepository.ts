// repositório fake para lidar com as funções do db
import { v4 } from 'uuid';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date)
    );

    return findAppointment;
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    // appointment.id = v4();
    // appointment.date = date;
    // appointment.provider_id = provider_id;
    Object.assign(appointment, { id: v4(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }

}

export default AppointmentsRepository
