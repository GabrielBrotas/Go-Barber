import { Router } from 'express';

import appointmentsRouter from './appointments.routes'
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

// use funciona para qualquer tipo de rota, para qualquer rota (get, post, put, ...) que começe com '/appointments' o que vem depois vai ser executado de acordo com as rotas dentro desse arquivo
routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)

export default routes;
