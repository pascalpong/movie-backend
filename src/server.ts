import fastify from 'fastify';
import fastifyMongo from '@fastify/mongodb';
import movieRoutes from './routes/movie.route';
import { AddressInfo } from 'net';
import dotenv from 'dotenv';

dotenv.config();

const server = fastify({ logger: true });

// Connect to MongoDB
server.register(fastifyMongo, {
  url: process.env.MONGO_URL,
})

// Register routes
server.register(movieRoutes);

// Start the server
const start = async () => {
  try {
    const port = Number(process.env.PORT) ?? 8000;
    await server.listen({ port });
    server.log.info(`Server listening on ${(server.server.address() as AddressInfo)?.port ?? 'unknown port'}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();