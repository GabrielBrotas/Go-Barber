import { Router } from 'express';
import appointmentsRouter from './appointments.routes'

const routes = Router();

// use funciona para qualquer tipo de rota, para qualquer rota (get, post, put, ...) que começe com '/appointments' o que vem depois vai ser executado de acordo com as rotas dentro desse arquivo
routes.use('/appointments', appointmentsRouter)

export default routes;
