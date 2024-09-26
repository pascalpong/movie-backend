import { FastifyInstance } from "fastify";
import {
  toCreateBanner,
  toDeleteBanner,
  toGetBanner,
  toGetOneBanner,
  toUpdateBanner,
} from "../controllers/ad-banner.controller";

const adBannerRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/ad-banner", toGetBanner);
  fastify.get("/ad-banner/:id", toGetOneBanner);
  fastify.post("/ad-banner", {
    handler: toCreateBanner
  });
  fastify.patch("/ad-banner/:id", toUpdateBanner);
  fastify.delete("/ad-banner/:id", toDeleteBanner);
};

export default adBannerRoutes;
