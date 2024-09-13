import { FastifyReply } from 'fastify';
import { IUser } from '../models/user.model';
import { CustomFastifyRequest } from '../types/fastify-custom';
import { deleteUser, findUserById, updateUser } from '../services/user.service';

export const toGetUser = async (request: CustomFastifyRequest, reply: FastifyReply): Promise<void> => {
    const userId = (request.params as { id: string }).id;
    try {
        const user = await findUserById(userId);
        if (!user) {
            reply.status(404).send({ message: 'User not found' });
            return;
        }
        reply.send(user);
    } catch (error) {
        reply.status(500).send({ message: 'Error fetching user' });
    }
};

export const toUpdateUser = async (request: CustomFastifyRequest, reply: FastifyReply): Promise<void> => {
    const userId = (request.params as { id: string }).id;
    const updateData = request.body as Partial<IUser>;
    try {
    const updatedUser = await updateUser(userId, updateData);
    if (!updatedUser) {
        reply.status(404).send({ message: 'User not found' });
        return;
    }
    reply.send(updatedUser);
    } catch (error) {
    reply.status(500).send({ message: 'Error updating user' });
    }
};

export const toDeleteUser = async (request: CustomFastifyRequest, reply: FastifyReply): Promise<void> => {
    const userId = (request.params as { id: string }).id;
    try {
    const result = await deleteUser(userId);
    if (!result) {
        reply.status(404).send({ message: 'User not found' });
        return;
    }
    reply.send({ message: 'User deleted successfully' });
    } catch (error) {
    reply.status(500).send({ message: 'Error deleting user' });
    }
};
