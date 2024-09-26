import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import { initializeMovieCollection } from "./services/movie/movie.service";
import { initializeBannerCollection } from "./services/ad-banner/banner.service";
import { initializeAnnouncementCollection } from "./services/announcement/announcement.service";
import { Movie } from "./models/movie.model";
import { Banner } from "./models/banner.model";
import { Announcement } from "./models/announcement.model";

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 8000;

    initializeMovieCollection(Movie)
    initializeBannerCollection(Banner)
    initializeAnnouncementCollection(Announcement)

    await app.listen({ port });
    const address = app.server.address();
    if (address && typeof address !== "string") {
      app.log.info(`Server listening on ${address.port}`);
    }
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
