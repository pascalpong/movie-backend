import fastify, { FastifyInstance } from "fastify";
import dotenv from "dotenv";
dotenv.config();
import cors from "@fastify/cors";
import movieRoutes from "./routes/movie.route";
import authRoutes from "./routes/user.route";
import mongoose from "mongoose";
import fastifyStatic from "@fastify/static";
import fastifyMultipart from "@fastify/multipart";
import path from "path";
import uploadRoutes from "./routes/upload.route";
import adBannerRoutes from "./routes/banner-ad.routes";
import announcementRoutes from "./routes/announcement.routes"
const app: FastifyInstance = fastify({ logger: true, trustProxy: true });

app.register(cors, {
  origin: "*",
});
app.register(fastifyMultipart, {
  limits: {
    fieldNameSize: 100,
    fieldSize: 100,
    fields: 10,
    fileSize: 1000000,
    files: 1,
    headerPairs: 2000,
  },
});

app.register(fastifyStatic, {
  root: path.join(__dirname, "../public/uploads"),
  prefix: "/uploads/",
});

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectToDatabase();

app.register(movieRoutes);
app.register(authRoutes);
app.register(uploadRoutes);
app.register(adBannerRoutes);
app.register(announcementRoutes);

export default app;
