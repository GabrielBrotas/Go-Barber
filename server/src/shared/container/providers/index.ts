import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

// Criar uma instancia da classe EtherealMailProvider, assim vai gerar o constructor obrigatoriamente, tem a mesma funcionalidade do registerSingleton porém, o registerSingleton não cria o constructor
container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
