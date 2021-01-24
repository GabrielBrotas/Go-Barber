// ? rotas relacionadas a agendamentos
// ? O papel da rota é: Receber a requisição, chamar outro arquivo, devolver uma resposta

import {Router} from 'express'

import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try{
    const {email, password} = request.body;

    const authenticateUser = new AuthenticateUserService()

    const { user, token } = await authenticateUser.execute({
      email,
      password
    })

    delete user.password;

    return response.json({ user, token })
  } catch(err) {
    // o catch vai pegar qualquer erro que alguma das funções dispare, ex: throw Error('...')
    // dentro do err vai receber apenas o err.message
    return response.status(400).json({error: err.message})
  }
})

export default sessionsRouter