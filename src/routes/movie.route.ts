import { FastifyInstance } from 'fastify';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';
import { Collection } from 'mongodb';

async function userRoutes(fastify: FastifyInstance) {
  
  if (!fastify.mongo || !fastify.mongo.db) {
    throw new Error('MongoDB is not initialized');
  }

  const collection = fastify.mongo.db.collection('movies') as unknown as Collection<Movie>;
  const movieService = new MovieService(collection); // Initialize the service

  fastify.get('/movies', async (request, reply) => {
    const movies = await movieService.getAllMovies(); // Use the service
    reply.send(movies);
  });

  fastify.post('/movies', async (request, reply) => {
    const movie: any = request.body; // Ensure the type is correct
    const insertedId = await movieService.addMovie(movie); // Use the service
    reply.send(insertedId);
  });
}

export default userRoutes;