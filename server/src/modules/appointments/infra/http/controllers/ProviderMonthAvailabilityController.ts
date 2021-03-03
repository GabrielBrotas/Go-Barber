import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    ); // passar os dados para outro arquivo

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      year,
    }); // passar os dados para outro arquivo

    return response.json(availability); // retornar resposta
  }
}
