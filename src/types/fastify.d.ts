import 'fastify';
import { FastifyRequest } from 'fastify';
import { IUser } from '../models/user.model';

declare module 'fastify' {
  interface FastifyInstance {
    mongo: {
      db: {
        collection<T>(name: string): Collection<T>;
      };
    };
  }

  interface FastifyRequest {
    user?: IUser;
  }
}