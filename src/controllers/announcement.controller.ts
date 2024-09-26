import { FastifyReply, FastifyRequest } from "fastify";
import { createAnnouncement, deleteAnnouncement, getActiveAnnouncement, updateAnnouncement } from "../services/announcement/announcement.service";
import { AnnouncementType } from "../types/announcement.type";


export const toGetLatestAnnouncement = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { active } = request.query as {active: boolean}
    const data = await getActiveAnnouncement(active);
    reply.send({status: 'success', data});
  } catch (error: unknown) {
    console.error(error);
    reply.status(500).send({
      error: "Ad retrieval failed",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}

export const toAddAnnouncement = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { body } = request;
    const data = await createAnnouncement(body as AnnouncementType)
    reply.send({status: 'success', data});
  } catch (error: unknown) {
    console.error(error);
    reply.status(500).send({
      error: "Ad retrieval failed",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}

export const toUpdateAnnouncement = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as {id: string};
    const data = await updateAnnouncement(id)
    reply.send({status: 'success', data});
  } catch (error: unknown) {
    console.error(error);
    reply.status(500).send({
      error: "Ad retrieval failed",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}

export const toDeleteAnnouncement = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as {id: string};
    const data = await deleteAnnouncement(id)
    reply.send({status: 'success', data});
  } catch (error: unknown) {
    console.error(error);
    reply.status(500).send({
      error: "Ad retrieval failed",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}