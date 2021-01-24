// ? Models ou Entidade, vai armazenar o formato de um dado que vai ser salvo no banco de dados
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'

import User from './User'

@Entity('appointments')
class Appointment {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({name: 'provider_id'}) // qual coluna que vai identificar qual o prestador do agendamento
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @UpdateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment
