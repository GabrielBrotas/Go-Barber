// ? Models ou Entidade, vai armazenar o formato de um dado que vai ser salvo no banco de dados
import {v4} from 'uuid' // gerar id aleatorio

class Appointment {
  id: string;

  provider: string;

  date: Date;

  // Omit vai receber como primeiro parametro a class, dizendo que vai receber todos os valores que ela tem(como se fosse uma interface) e depois vai o campo que vai omitir, nesse caso o 'id' pois é gerado de forma automatica, quando um campo novo for adicionado na class automaticamente vai ser adicionado como 'interface' do constructor
  constructor({provider, date}: Omit<Appointment, 'id'>) {
    this.id = v4();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment
