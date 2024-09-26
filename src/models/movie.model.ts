import { Schema, model } from 'mongoose';
import MovieType from '../types/movie.type';

const movieSchema = new Schema<MovieType>({ 
    id: { type: Number, required: true },
    title: { type: String, required: true },
    title_id: { type: String },
    actor: { type: String },
    author: { type: String },
    bunny_url: { type: String },
    cate_id: { type: String },
    createdBy: { type: String },
    createdDate: { type: String },
    des: { type: String },
    duration: { type: String },
    genre: { type: String },
    image: { type: String },
    latest_ep_date: { type: String },
    number_ep: { type: String },
    release_date: { type: String },
    status: { type: String },
    statusvideo: { type: String },
    updatedBy: { type: String },
    updatedDate: { type: String },
    url_movie: { type: String },
    video_episode: { type: String },
    view_count: { type: String },
});

export const Movie = model('Movie', movieSchema);