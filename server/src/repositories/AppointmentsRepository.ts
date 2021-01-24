// ? Persistência (local onde vai ficar amazenado os dados) <-> Repositório <-> Rota
// ? Repositorio é o responsável por tudo que vai mexer nos dados de alguma forma, exemplo: find, create, delete, etc...
import {EntityRepository, Repository} from 'typeorm'

import Appointment from '../models/Appointment'

@EntityRepository(Appointment)
// extender metodos já existentes do repositorio do typeorm e dentro do parametro vamos colocar o model
class AppointmentsRepository extends Repository<Appointment> {

  // toda função assincrona retorna uma promisse, dentro dessa promisse vai ser um Appointment ou null
  public async findByDate(date: Date): Promise<Appointment | null> {
     // verifica se a data que a pessoa quer agendar já existe algum agendamento
    const findAppointment = await this.findOne({
      where: { date }
    });

    return findAppointment || null
  }

}

export default AppointmentsRepository
