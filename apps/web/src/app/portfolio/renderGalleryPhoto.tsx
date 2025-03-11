import { SanityImage } from "@/components/sanity-image";
import {
  type RenderImageContext as RenderImageContextLib,
  type RenderImageProps,
} from "react-photo-album";
import { type Photograph } from "./types";

type RenderImageContext = RenderImageContextLib & {
  photo: Photograph;
};

export default function renderGalleryPhoto(
  {}: RenderImageProps,
  { photo, width, height, index }: RenderImageContext & { photo: Photograph },
) {
  if (!photo.asset) return null;

  return (
    <div
      className="shadow-xl"
      style={{
        width: "100%",
        position: "relative",
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <SanityImage
        asset={photo}
        quality={65}
        loading={index <= 2 ? "eager" : "lazy"}
      />
    </div>
  );
}
