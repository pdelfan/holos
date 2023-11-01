import { getImgurThumbnail } from "./linkUtils";

export const imgurLoader = ({ src }: { src: string }) => {
  return getImgurThumbnail(src, "t");
};
