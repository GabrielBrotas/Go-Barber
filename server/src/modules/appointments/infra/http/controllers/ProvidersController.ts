import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderService from '@modules/appointments/services/ListProviderService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProviderService); // passar os dados para outro arquivo

    const providers = await listProviders.execute({
      user_id,
    }); // passar os dados para outro arquivo

    return response.json(providers); // retornar resposta
  }
}
