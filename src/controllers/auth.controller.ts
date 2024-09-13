import { FastifyReply, FastifyRequest } from 'fastify';
import { createAccessToken, createRefreshToken } from '../utils/token';
import { IUser } from '../models/user.model';
import { CustomFastifyRequest } from '../types/fastify-custom';
import { createUser, findUserByEmail, findUserByUsername } from '../services/user.service';


export const register = async (request: FastifyRequest, reply: FastifyReply) => {
    const { username, email, password } = request.body as { username: string; email: string; password: string };
    
    try {

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return reply.status(400).send({ message: 'User already exists' });
        }

        const user: IUser = await createUser(username, email, password);

        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        reply.status(201).send({ accessToken, refreshToken });
    } catch (error) {
        console.log(error)
        reply.status(500).send({ message: 'Error creating user' });
    }
}

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
    const { username, password } = request.body as { username: string; password: string };

    try {
        const user = await findUserByUsername(username);
        if (!user) {
            return reply.status(400).send({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return reply.status(400).send({ message: 'Invalid credentials' });
        }

        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        reply.send({ accessToken, refreshToken });
    } catch (error) {
        console.log(error)
        reply.status(500).send({ message: 'Error signing in' });
    }
}

export const logout = async (request: FastifyRequest, reply: FastifyReply) => {

    reply.send({ message: 'Logged out successfully' });
}

export const getCurrentUser = async (request: CustomFastifyRequest, reply: FastifyReply) => {
    reply.send({ user: request.user });
}