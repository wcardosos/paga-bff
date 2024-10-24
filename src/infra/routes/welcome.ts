import { FastifyInstance } from 'fastify';
import { WelcomeService } from '@/app/services/welcome/welcome.service';

export function welcomeRoutes(app: FastifyInstance) {
  app.get('/welcome', async () => {
    const welcomeService = new WelcomeService();
    const welcome = welcomeService.execute();

    return welcome.message;
  });
}
