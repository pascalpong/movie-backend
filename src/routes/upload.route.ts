import { FastifyInstance } from "fastify";
import { toUploadFiles } from "../controllers/upload.controller";

const uploadRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/upload-image", toUploadFiles);
};
export default uploadRoutes;
