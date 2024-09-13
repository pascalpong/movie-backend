import axios from 'axios';
import { FastifyReply, FastifyRequest } from 'fastify';
import { addMovie, updateMovie, deleteMovie } from '../services/movie/movie.service';
import { generateSignedLink } from '../services/movie/util';

const movieProviderApi = process.env.MOVIE_PROVIDER_API as string;

export const toGetAllMovies = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { category, page, search } = request.query as { category: string, page: string, search: string };
        const params = new URLSearchParams();
        let url = `${movieProviderApi}`;
        if(search) {
            url = url + `/search?key=${search}${page ? `&page=${page}` : ''}`
        } else {
            if (category) {
                params.append('id', category);
            }
            if (page) {
                params.append('page', page);
            }
            url = url + `/list${params.toString() ? '?' + params.toString() : ''}`
        }
        const response = await axios.get(url);
        const movies = response.data;
        reply.send(movies);
    } catch (error) {
        console.log(error)
        reply.status(500).send({ error: 'Internal Server Error', message: error });
    }
}

export const toPlayMovie = async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as { id: string };
    const { id } = body;
    const playUrl = await axios.get(`${movieProviderApi}/vods?id=${id}`);
    if(playUrl.data.data.plays[0]) {
        const { data } = playUrl.data;
        const { m3u8 } = data.plays[0];
        const signedLinkDetails = await generateSignedLink(request);
        const {sign} = signedLinkDetails;
        reply.send({ 
            data: {
                url: `${m3u8 + sign}`,
                data: playUrl.data.data
            }
        });
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
