// ? rotas relacionadas a agendamentos
// ? O papel da rota é: Receber a requisição, chamar outro arquivo, devolver uma resposta

import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated); // todas as rotas passarem pelo middleware

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// })

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
