import axios from 'axios';
import { FastifyReply, FastifyRequest } from 'fastify';
import { addMovie, updateMovie, deleteMovie } from '../services/movie/movie.service';
import { orderByRank } from '../services/movie/util';

const movieProviderApi = process.env.MOVIE_PROVIDER_API as string;
const config = {
    headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.MOVIE_PROVIDER_API_KEY as string,
    }
}

export const toGetAllMovies = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { genre, page ,limit } = request.query as { genre: string, page: string, limit: string };
        const params = new URLSearchParams();
        let url = `${movieProviderApi}/api/movies?`;
        if (genre) {            
            url = url + `genre=${genre}&`;
        } 
        if (page) {            
            url = url + `page=${page}&`;
        }
        if(limit) {            
            url = url + `itemsPerPage=${limit}&`;
        }
        const response = await axios.post(url, {}, config);
        const movies = response.data;
        reply.send(movies);
    } catch (error) {
        console.log(error)
        reply.status(500).send({ error: 'Internal Server Error', message: error });
    }
}

export const toSearchMovies = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { search } = request.query as { search: string };
        const url = `${movieProviderApi}/api/search?search=${search}`
        const response = await axios.get(url, config);
        const movies = response.data;
        reply.send({data: movies});
    } catch (error) {
        console.log(error)
        reply.status(500).send({ error: 'Internal Server Error', message: error });
    }
}

export const toGetMovieDetails = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const body = request.body as { id: string, title: string, number_ep: string | null };
        const { id, title, number_ep } = body;
        const playUrl = await axios.post(`${movieProviderApi}/api/movie/detail`, { id, title, ep: number_ep }, config);

        reply.send({status: 'success', data: playUrl.data.success});
    } catch (error: any) {
        console.error('Error occurred while playing movie:', error.response ? error.response.data : error.message);
        reply.status(500).send({ error: 'Internal Server Error', message: error.response ? error.response.data : 'An error occurred' });
    }
}

export const toGetCategoryMovies = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { limit, latest, popularity } = request.query as { limit: string|null, latest: string|null, popularity: string|null }
        const url = `${movieProviderApi}/api/movies/category/in-cate?${limit ? `limit=${limit}&`:''}${latest ? `latest=${latest}&`:''}${popularity ? `popularity=${popularity}&`:''}`
        const data = await axios.get(url, config);
        reply.send({status: 'success', data: data.data.category});
    } catch (error: any) {
        console.error('Error occurred while playing movie:', error.response ? error.response.data : error.message);
        reply.status(500).send({ error: 'Internal Server Error', message: error.response ? error.response.data : 'An error occurred' });
    }
}

export const toGetEpisodes = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.query as { id: string|null }
        const url = `${movieProviderApi}/api/movie/episodes?${id ? `title_id=${id}`:''}`        
        const data = await axios.get(url, config);
        reply.send({status: 'success', data: data.data});
    } catch (error: any) {
        console.error('Error occurred while playing movie:', error.response ? error.response.data : error.message);
        reply.status(500).send({ error: 'Internal Server Error', message: error.response ? error.response.data : 'An error occurred' });
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
