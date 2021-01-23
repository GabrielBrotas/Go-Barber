// ? rotas relacionadas a agendamentos
// ? O papel da rota é: Receber a requisição, chamar outro arquivo, devolver uma resposta

import {Router} from 'express'
import {parseISO} from 'date-fns' // -parseISO converte um date formato string para um formato Date nativo do JS

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
})

appointmentsRouter.post('/', (request, response) => {
  try{
    const {provider, date} = request.body; //receber requisição
    const parsedDate = parseISO(date); //transformar valor da requisição

    const createAppointment = new CreateAppointmentService(appointmentsRepository) // passar os dados para outro arquivo

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider
    }); // passar os dados para outro arquivo

    return response.json(appointment) //retornar resposta
  } catch(err) {
    // o catch vai pegar qualquer erro que alguma das funções dispare, ex: throw Error('...')
    // dentro do err vai receber apenas o err.message
    return response.status(400).json({error: err.message})
  }
})

export default appointmentsRouter
