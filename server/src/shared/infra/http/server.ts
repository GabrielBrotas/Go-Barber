import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'; // para o express ser capaz de lidar com as rotas assincronas
import cors from 'cors';
import { errors } from 'celebrate';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/RateLimiter';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());

// rota de arquivos estaticos, o que vem depois de '/files' vai ser o nome do arquivo e vai ser mostrado de forma estatica. assim podemos ver o conteudo da imagem
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use('/', routes);
app.use(errors());

// tratativa de erros, ele tem que vim depois das rotas,
// os middleware de erro tem 4 parametros, o erro, request, response e o next
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    // se eu conheco esse erro, se foi gerado pelas rotas da nossa aplicação
    if (err instanceof AppError) {
      // retornar de uma maneira amigavel para o front
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
    console.error(err);
    // se foi um erro em que nao estavamos esperando...
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('listening in port 3333');
});
