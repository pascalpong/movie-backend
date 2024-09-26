import { FastifyReply, FastifyRequest } from "fastify";
import { uploadFiles } from "../services/upload/upload.service";

export const toUploadFiles = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const files = await uploadFiles(request);
    reply.code(200).send({
      data: {
        success: true,
        message: "Files uploaded and processed successfully",
        fileUrls: files,
      },
    });
  } catch (error: unknown) {
    console.error(error);
    reply.status(500).send({
      error: "File upload failed",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};
