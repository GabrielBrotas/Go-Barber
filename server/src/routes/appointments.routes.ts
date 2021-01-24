// ? rotas relacionadas a agendamentos
// ? O papel da rota é: Receber a requisição, chamar outro arquivo, devolver uma resposta

import {Router} from 'express'
import {parseISO} from 'date-fns' // -parseISO converte um date formato string para um formato Date nativo do JS
import {getCustomRepository} from 'typeorm'

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated) // todas as rotas passarem pelo middleware

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
})

appointmentsRouter.post('/', async (request, response) => {
  const {provider_id, date} = request.body; //receber requisição
  const parsedDate = parseISO(date); //transformar valor da requisição

  const createAppointment = new CreateAppointmentService(); // passar os dados para outro arquivo

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id
  }); // passar os dados para outro arquivo

  return response.json(appointment); //retornar resposta

})

export default appointmentsRouter
