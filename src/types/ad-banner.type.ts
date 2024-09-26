import { BaseTypeModel } from "./base-type";

export default interface BannerType extends BaseTypeModel {
  id?: number;
  url: string;
  image: string;
  shop_name?: string;
  add_time?: string;
  until?: string;
  rank?: string;
}
