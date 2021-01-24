// ? Models ou Entidade, vai armazenar o formato de um dado que vai ser salvo no banco de dados
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('appointments')
class Appointment {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment
