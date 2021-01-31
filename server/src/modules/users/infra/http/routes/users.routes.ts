// ? rotas relacionadas a agendamentos
// ? O papel da rota é: Receber a requisição, chamar outro arquivo, devolver uma resposta
import { Router } from 'express';
import { container } from 'tsyringe';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

// instancia do multer para fazer os upload de um unico arquivo ou multiplos...
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

// patch atualiza alguns campos enquanto o put é para atualizar toda informação
// middleware para verificar se o usario da autenticado e o do multer para fazer o upload de imagem
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)

export default usersRouter;
