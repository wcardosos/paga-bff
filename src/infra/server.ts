import Fastify from 'fastify';
import { welcomeRoutes } from './routes/welcome';
import { env } from './config/env';
import { budgetsRoutes } from './routes/budgets';

const fastify = Fastify({
  logger: true,
});

fastify.register(welcomeRoutes);
fastify.register(budgetsRoutes);

fastify.listen({ port: env.PORT }).then(() => console.log('Server is running'));
