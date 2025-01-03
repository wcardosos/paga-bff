import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { welcomeRoutes } from './routes/welcome';
import { budgetsRoutes } from './routes/budgets';
import { ResourceNotFoundError } from '@/app/errors/resource-not-found';
import { authRoutes } from './routes/auth';
import { UnauthorizedError } from '@/app/errors/unauthorized';
import { env } from './config/env';
import { jwtMiddleware } from './middlewares/jwt';
import { healthRoutes } from './routes/health';

const app = Fastify({
  logger: true,
});

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});
app.register(jwt, {
  secret: env.JWT_SECRET,
});
app.register(jwtMiddleware);

app.setErrorHandler(async (error, request, reply) => {
  if (error instanceof ResourceNotFoundError) {
    return reply.status(404).send(error.message);
  } else if (error instanceof UnauthorizedError) {
    return reply.status(401).send(error.message);
  } else {
    return reply.status(500).send(error.message);
  }
});

app.register(welcomeRoutes);
app.register(budgetsRoutes);
app.register(authRoutes);
app.register(healthRoutes);

export { app };
