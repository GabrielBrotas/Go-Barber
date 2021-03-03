import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    ); // passar os dados para outro arquivo

    const availability = await listProviderDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    }); // passar os dados para outro arquivo

    return response.json(availability); // retornar resposta
  }
}
