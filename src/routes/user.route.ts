import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { authMiddleware } from '../middleware/auth.middleware';
import { toDeleteUser, toGetUser, toUpdateUser } from '../controllers/user.controller';
import { getCurrentUser, login, logout, register } from '../controllers/auth.controller';

const userRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {

  // Auth routes
  fastify.post('/register', register);
  fastify.post('/login', login);
  fastify.post('/logout', { preHandler: authMiddleware }, logout);
  fastify.get('/me', { preHandler: authMiddleware }, getCurrentUser);

  // User routes
  fastify.get('/:id', { preHandler: authMiddleware }, toGetUser);
  fastify.put('/:id', { preHandler: authMiddleware }, toUpdateUser);
  fastify.delete('/:id', { preHandler: authMiddleware }, toDeleteUser);
  
};

export default userRoutes;