import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    mongo: {
      db: {
        collection<T>(name: string): Collection<T>;
      };
    };
  }
}