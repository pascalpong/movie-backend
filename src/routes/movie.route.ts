import { FastifyInstance } from 'fastify'; 
import { toAddMovie, toDeleteMovie, toGetAllMovies, toPlayMovie, toUpdateMovie } from '../controllers/movie.controller';

async function movieRoutes(fastify: FastifyInstance) {

  fastify.get('/movies', toGetAllMovies);
  fastify.post('/movie/play', toPlayMovie);
  fastify.post('/movies', toAddMovie);
  fastify.patch('/movies/:id', toUpdateMovie);
  fastify.delete('/movies/:id', toDeleteMovie);

}

export default movieRoutes;