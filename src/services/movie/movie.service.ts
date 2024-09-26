import Movie from '../../types/movie.type';
import { Model } from 'mongoose';

let movieModel: Model<Movie>;

export const initializeMovieCollection = (model: Model<Movie>) => {
  movieModel = model;
};

export const addMovie = async (movie: Movie) => {
  try { 
    const body = movie;
      const newMovie = new movieModel({...movie, createdAt: new Date()});
      const result = await newMovie.save();
      return result._id;
  } catch (error) {
      console.log(error);
  }
}

export const updateMovie = async (id: string, movie: Movie) => {
  try {
      const result = await movieModel.updateOne({ _id: id }, { $set: movie });
      return result.modifiedCount > 0;
  } catch (error) {
      console.error('Error updating movie:', error);
      throw error;
  }
}

export const deleteMovie = async (id: string) => {
  try {
      const result = await movieModel.deleteOne({ _id: id });
      return result.deletedCount > 0;
  } catch (error) {
      console.log(error);
  }
}
