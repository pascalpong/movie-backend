import { FastifyRequest, FastifyReply } from "fastify";

import {
  createBanner,
  deleteBanner,
  getBanners,
  getOneBanner,
  updateBanner,
} from "../services/ad-banner/banner.service";
import { processAndUploadFile } from "../services/upload/upload.service";
import BannerType from "../types/ad-banner.type";

export const toGetBanner = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const data = await getBanners();
    reply.send({status: 'success', data});
  } catch (error: unknown) {
    console.error(error);
    reply.status(500).send({
      error: "Ad retrieval failed",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};

export const toGetOneBanner = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as { id: number };
    const data = await getOneBanner(id);
    reply.send(data);
  } catch (error: unknown) {
    console.error(error);
    reply.status(500).send({
      error: "Ad retrieval failed",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};

export const toCreateBanner = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const data = await request.file();
    if (!data) {
      throw new Error('No file uploaded');
    }

    const file = await data.toBuffer();
    const fields = data.fields;
    const fileUrl = await processAndUploadFile(file, data.filename);

    const getFieldValue = (field: unknown): string => {
      if (typeof field === 'string') {
        return field;
      }
      if (Array.isArray(field) && field.length > 0 && typeof field[0] === 'string') {
        return field[0];
      }
      if (field && typeof field === 'object' && 'value' in field && typeof field.value === 'string') {
        return field.value;
      }
      return '';
    };

    const bannerData: BannerType = {
      url: getFieldValue(fields.url),
      image: fileUrl,
      shop_name: getFieldValue(fields.shop_name),
      add_time: getFieldValue(fields.add_time) || new Date().toISOString(),
      until: getFieldValue(fields.until),
      rank: getFieldValue(fields.rank)
    };
    const banner = await createBanner(bannerData);
    reply.code(201).send({
      success: true,
      message: "Banner created successfully",
      banner,
    });
  } catch (error: unknown) {
    console.error(error);
    reply.status(500).send({
      error: "Ad creation failed",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};

export const toUpdateBanner = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as { id: number };
    const bannerData = request.body as Partial<BannerType>;
    const updatedAd = await updateBanner(id, bannerData);
    reply.code(200).send({
      success: true,
      message: "Banner updated successfully",
      updatedAd,
    });
  } catch (error: unknown) {
    console.error(error);
    reply.status(500).send({
      error: "Ad update failed",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};

export const toDeleteBanner = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  try {
    await deleteBanner(id);
    reply.code(204).send({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error: unknown) {
    console.error(error);
    reply.status(500).send({
      error: "Ad deletion failed",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};
