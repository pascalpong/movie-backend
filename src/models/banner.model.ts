import { Schema, model } from "mongoose";

import BannerType from "../types/ad-banner.type";

const bannerSchema = new Schema<BannerType>({
  id: { type: Number },
  url: { type: String, required: true },
  image: { type: String },
  shop_name: { type: String },
  add_time: { type: Date, default: Date.now },
  until: { type: Date },
  rank: { type: String }
});

export const Banner = model("banner", bannerSchema);
