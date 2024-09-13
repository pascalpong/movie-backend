import { FastifyRequest } from 'fastify';
import { IUser } from '../models/user.model';

export interface CustomFastifyRequest extends FastifyRequest {
  user?: IUser;
}