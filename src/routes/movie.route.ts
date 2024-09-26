import { FastifyInstance } from 'fastify'; 
import { toAddMovie, toDeleteMovie, toGetAllMovies, toGetCategoryMovies, toGetEpisodes, toGetMovieDetails, toSearchMovies, toUpdateMovie } from '../controllers/movie.controller';

const movieRoutes = async (fastify: FastifyInstance) => {

  fastify.get('/movies', toGetAllMovies);
  fastify.get('/movies/search', toSearchMovies);
  fastify.get('/movies/episodes', toGetEpisodes);
  fastify.get('/movie/categories', toGetCategoryMovies);
  fastify.post('/movie/detail', toGetMovieDetails);
  fastify.post('/movies', toAddMovie);
  fastify.patch('/movies/:id', toUpdateMovie);
  fastify.delete('/movies/:id', toDeleteMovie);

}
export default movieRoutes;
