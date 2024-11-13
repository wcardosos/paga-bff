import Fastify from 'fastify';
import cors from '@fastify/cors';
import { welcomeRoutes } from './routes/welcome';
import { budgetsRoutes } from './routes/budgets';
import { ResourceNotFoundError } from '@/app/errors/resource-not-found';

const app = Fastify({
  logger: true,
});

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

app.setErrorHandler(async (error, request, reply) => {
  if (error instanceof ResourceNotFoundError) {
    return reply.status(404).send(error.message);
  } else {
    return reply.status(500).send(error.message);
  }
});

app.register(welcomeRoutes);
app.register(budgetsRoutes);

export { app };
