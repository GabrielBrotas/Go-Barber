// ? Persistência (local onde vai ficar amazenado os dados) <-> Repositório <-> Rota
// ? Repositorio é o responsável por tudo que vai mexer nos dados de alguma forma, exemplo: find, create, delete, etc...
import Appointment from '../models/Appointment'
import {isEqual} from 'date-fns' // -isEqual verifica se as horas são iguais

// DTO - Data Transfer Object (transferência de dados via objeto)
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  // private porque é uma variável que não vai ser acessível por fora da classe, apenas os metodos dessa classe vai poder manipular os dados dos appointments
  private appointments: Appointment[];

  constructor() {
    // inicializar o array de agendamentos
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments
  }

  public findByDate(date: Date): Appointment | null {
     // verifica se a data que a pessoa quer agendar já existe algum agendamento
    const findAppointment = this.appointments.find( appointment => (
    isEqual(date, appointment.date)
    ))

    return findAppointment || null
  }

  // criar um novo agendamento
  public create({provider, date}: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({provider, date})

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository
