import { Request, Response } from 'express';
// import { parseISO } from 'date-fns'; // -parseISO converte um date formato string para um formato Date nativo do JS
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body; // receber requisição

    // const parsedDate = parseISO(date);  transformar valor da requisição

    // o resolve vai carregar o service, verificar se o constructor precisa de alguma dependencia, caso sim ele vai pegar automaticamente de dentro de @shared/container
    const createAppointment = container.resolve(CreateAppointmentService); // passar os dados para outro arquivo

    const appointment = await createAppointment.execute({
      date,
      provider_id,
      user_id,
    }); // passar os dados para outro arquivo

    return response.json(appointment); // retornar resposta
  }
}
