import { FastifyInstance } from 'fastify';
import { createUser, getUsers } from '../controllers/user.controller.ts';

export const userRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/users', getUsers);
    fastify.post('/users', createUser);
};