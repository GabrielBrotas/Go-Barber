import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body; // receber requisição

    const createAppointment = container.resolve(
      ListProviderAppointmentsService,
    ); // passar os dados para outro arquivo

    const appointments = await createAppointment.execute({
      provider_id,
      day,
      month,
      year,
    }); // passar os dados para outro arquivo

    return response.json(appointments); // retornar resposta
  }
}
