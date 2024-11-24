import * as fastify from 'fastify';

declare module 'fastify' {
  export interface FastifyInstance extends fastify.FastifyInstance {
    authenticate(): void;
  }
}
