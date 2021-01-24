import 'reflect-metadata';

import express from 'express';
import routes from './routes/index';

import './database';
import uploadConfig from './config/upload';
const app = express();

app.use(express.json());

// rota de arquivos estaticos, o que vem depois de '/files' vai ser o nome do arquivo e vai ser mostrado de forma estatica. assim podemos ver o conteudo da imagem
app.use('/files', express.static(uploadConfig.directory))
app.use('/', routes);

app.listen(3333, () => {
    console.log("listening in port 3333");
});
