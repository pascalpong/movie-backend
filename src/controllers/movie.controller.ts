import axios from 'axios';
import { FastifyReply, FastifyRequest } from 'fastify';
import { addMovie, updateMovie, deleteMovie } from '../services/movie.service';

const movieProviderApi = process.env.MOVIE_PROVIDER_API as string;

export const toGetAllMovies = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { category, page } = request.query as any;
        const params = new URLSearchParams();
        if (category) {
            params.append('id', category);
        }
        if (page) {
            params.append('page', page);
        }

        const url = `${movieProviderApi}${params.toString() ? '?' + params.toString() : ''}`;
        const response = await axios.get(url);
        const movies = response.data;
        reply.send(movies);
    } catch (error) {
        console.log(error)
        reply.status(500).send({ error: 'Internal Server Error', message: error });
    }
}

export const toAddMovie = async (request: FastifyRequest, reply: FastifyReply) => { 
    const movie = request.body as any;
    const insertedId = await addMovie(movie);
    reply.send(insertedId);
}

export const toUpdateMovie = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const id = request.params.id;
    const movie = request.body as any;
    const updated = await updateMovie(id, movie);
    reply.send({ success: updated });
}

export const toDeleteMovie = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const id = request.params.id;
    const deleted = await deleteMovie(id);
    reply.send({ success: deleted });
}
