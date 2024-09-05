import { Movie } from '../models/movie';
import { Collection } from 'mongodb'; // Updated import

export class MovieService {
  private collection: Collection<Movie>; // Updated type

  constructor(collection: Collection<Movie>) {
    this.collection = collection;
  }

  async getAllMovies() {
    return await this.collection.find().toArray();
  }

  async addMovie(movie: Movie) {
    try {
        console.log(movie);
        const result = await this.collection.insertOne(movie);
        return result.insertedId;
    } catch (error) {
        console.log(error)
    }
  }
}