/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

export const jwtMiddleware = fastifyPlugin(async (instance) => {
  instance.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (error: any) {
        return reply.status(error.statusCode ?? 500).send(error.message);
      }
    },
  );
});
