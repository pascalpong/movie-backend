import app from './app';
import { initializeCollection } from './services/movie/movie.service'; 
import { Movie } from './models/movie';

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 8000;

    // Initialize the movie model
    initializeCollection(Movie);

    await app.listen({ port });
    const address = app.server.address();
    if (address && typeof address !== 'string') { // Check if address is not null
      app.log.info(`Server listening on ${address.port}`);
    }
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();