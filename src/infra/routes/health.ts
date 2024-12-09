import { FastifyInstance, FastifyReply } from 'fastify';

export function healthRoutes(app: FastifyInstance) {
  app.get('/health', async (_, reply: FastifyReply) => {
    return reply.status(200).send();
  });
}
