// ? rotas relacionadas a agendamentos
// ? O papel da rota é: Receber a requisição, chamar outro arquivo, devolver uma resposta

import {Router} from 'express'
import {parseISO} from 'date-fns' // -parseISO converte um date formato string para um formato Date nativo do JS
import {getCustomRepository} from 'typeorm'

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
})

appointmentsRouter.post('/', async (request, response) => {
  try{
    const {provider_id, date} = request.body; //receber requisição
    const parsedDate = parseISO(date); //transformar valor da requisição

    const createAppointment = new CreateAppointmentService(); // passar os dados para outro arquivo

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id
    }); // passar os dados para outro arquivo

    return response.json(appointment); //retornar resposta
  } catch(err) {
    // o catch vai pegar qualquer erro que alguma das funções dispare, ex: throw Error('...')
    // dentro do err vai receber apenas o err.message
    return response.status(400).json({error: err.message})
  }
})

export default appointmentsRouter
