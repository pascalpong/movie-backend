import Movie from '../../types/movie.type';
import { Model, ObjectId as MongooseObjectId, Types } from 'mongoose'; // Ensure ObjectId is imported

let movieModel: Model<Movie>;

export const initializeCollection = (model: Model<Movie>) => {
  movieModel = model;
};

export const getAllMovies = async () => {
    if (!movieModel) {
        throw new Error('Movie model is not initialized. Call initializeCollection first.');
    }
    try {
        return await movieModel.find();
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
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
