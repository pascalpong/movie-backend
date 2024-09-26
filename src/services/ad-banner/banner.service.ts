import { Model } from "mongoose";
import BannerType from "../../types/ad-banner.type";
let bannerModel: Model<BannerType>;
export const initializeBannerCollection = (model: Model<BannerType>) => {
  bannerModel = model;
};

export const getBanners = async () => {
  try {
    return await bannerModel.find();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createBanner = async (bannerData: BannerType) => {
  try {
    const newBanner = await bannerModel.create(bannerData);
    return newBanner;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getOneBanner = async (id: number) => {
  try {
    const detailBanner = await bannerModel.findOne({ id });
    if (!detailBanner) {
      throw new Error("Banner not found");
    }
    return detailBanner;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateBanner = async (
  id: number,
  bannerData: Partial<BannerType>
) => {
  try {
    const updatedBanner = await bannerModel.findOneAndUpdate(
      { id },
      bannerData,
      {
        new: true,
      }
    );
    return updatedBanner;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteBanner = async (id: string) => {
  try {
    const data = await bannerModel.findOneAndDelete({ _id: id });
    return data
  } catch (error) {
    console.log(error);
    throw error;
  }
};
