import { FastifyInstance } from "fastify";
import { toAddAnnouncement, toDeleteAnnouncement, toGetLatestAnnouncement, toUpdateAnnouncement,  } from "../controllers/announcement.controller";


const announcementRoutes = async (fastify: FastifyInstance) => {
    fastify.get("/announcement", toGetLatestAnnouncement);
    fastify.post("/announcement", toAddAnnouncement);
    fastify.patch("/announcement/:id", toUpdateAnnouncement);
    fastify.delete("/announcement/:id", toDeleteAnnouncement);
}

export default announcementRoutes;