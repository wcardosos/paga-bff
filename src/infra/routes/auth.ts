import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { env } from '../config/env';
import { JwtProviderAdapter } from '../providers/jwt-provider-adapter';
import { LoginService } from '@/app/services/auth/login.service';
import { loginSchema } from '../validations/auth';
import { HashProviderAdapter } from '../providers/hash-provider-adapter';

export function authRoutes(app: FastifyInstance) {
  const jwtProvider = new JwtProviderAdapter(env.JWT_SECRET);
  const hashProvider = new HashProviderAdapter();

  app.post('/auth/login', async (req: FastifyRequest, reply: FastifyReply) => {
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
      return reply.status(400).send('Credentials must be provided');
    }

    const { username, password } = validation.data;

    const loginService = new LoginService(
      env.ACCESS_USERNAME,
      env.ACCESS_PASSWORD,
      jwtProvider,
      hashProvider,
    );

    const token = await loginService.execute(username, password);

    return reply.status(200).send({ token });
  });
}
