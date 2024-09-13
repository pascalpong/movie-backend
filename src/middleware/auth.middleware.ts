import { FastifyReply } from 'fastify';
import { verifyAccessToken } from '../utils/token';
import { CustomFastifyRequest } from '../types/fastify-custom';
import { findUserById } from '../services/user.service';

export const authMiddleware = async (
  request: CustomFastifyRequest,
  reply: FastifyReply
) => {
  try {
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      reply.status(401).send({ message: 'No token provided' });
      return;
    }

    const decoded = verifyAccessToken(token);
    const user = await findUserById(decoded.userId);

    if (!user) {
      reply.status(401).send({ message: 'Invalid token' });
      return;
    }

    request.user = user;
  } catch (error) {
    reply.status(401).send({ message: 'Invalid token' });
  }
}