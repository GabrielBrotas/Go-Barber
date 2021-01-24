// ? rotas relacionadas a agendamentos
// ? O papel da rota é: Receber a requisição, chamar outro arquivo, devolver uma resposta
import {Router} from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'

import CreateUserService from '../services/CreateUserService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router();
// instancia do multer para fazer os upload de um unico arquivo ou multiplos...
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  try{
    const {name, email, password} = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    delete user.password;

    return response.json(user)
  } catch(err) {
    // o catch vai pegar qualquer erro que alguma das funções dispare, ex: throw Error('...')
    // dentro do err vai receber apenas o err.message
    return response.status(400).json({error: err.message})
  }
})

// patch atualiza alguns campos enquanto o put é para atualizar toda informação
// middleware para verificar se o usario da autenticado e o do multer para fazer o upload de imagem
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  
  return response.json({ok: true})
})

export default usersRouter
