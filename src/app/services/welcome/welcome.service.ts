import { Welcome } from '../../entities/welcome';

export class WelcomeService {
  execute(): Welcome {
    return Welcome.create({
      message: 'Welcome to Paga BFF API!',
    });
  }
}
