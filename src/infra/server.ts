import Fastify from 'fastify';
import { welcomeRoutes } from './routes/welcome';
import { env } from './config/env';

const fastify = Fastify({
  logger: true,
});

fastify.register(welcomeRoutes);

fastify.listen({ port: env.PORT }).then(() => console.log('Server is running'));
