import Fastify from 'fastify';
import { welcomeRoutes } from './routes/welcome';
import { budgetsRoutes } from './routes/budgets';

const app = Fastify({
  logger: true,
});

app.register(welcomeRoutes);
app.register(budgetsRoutes);

export { app };
