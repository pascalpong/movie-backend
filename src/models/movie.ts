import { Schema, model } from 'mongoose';
import MovieType from '../types/movie.type';

const movieSchema = new Schema<MovieType>({ 
    name: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String },
    introduction: { type: String },
    starring: { type: String },
    logo: { type: String },
    viewCount: { type: String },
    lastEpisodeAt: { type: String },
    broadcastedAt: { type: String },
    active: { type: String },
    url: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    deletedAt: { type: Date }
});

export const Movie = model('Movie', movieSchema);