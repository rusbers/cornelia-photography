import { getBlurDataURL, SanityImage } from "@/components/sanity-image";
import {
  type RenderImageContext as RenderImageContextLib,
  type RenderImageProps,
} from "react-photo-album";
import { type Photograph } from "./types";
import { Image } from "./image-plugin";
import { stegaClean } from "next-sanity";

type RenderImageContext = RenderImageContextLib & {
  photo: Photograph;
};

export default function renderGalleryPhoto(
  {}: RenderImageProps,
  { photo, width, height, index }: RenderImageContext & { photo: Photograph },
) {
  if (!photo.asset) return null;

  return (
    <Image
      className="shadow-xl"
      id={photo.asset._ref}
      width={width}
      height={height}
      alt={
        //@ts-ignore
        stegaClean(photo?.imageDescription) ?? stegaClean(photo.alt) ?? "Image"
      }
      queryParams={{ q: 100 }}
      preview={getBlurDataURL(photo).blurDataURL || undefined}
      loading={index <= 2 ? "eager" : "lazy"}
      sizes="(max-width: 584px) 90vw, (max-width: 1024px) 45vw, 28vw"
    />
  );

  // return (
  //   <div
  //     className="shadow-xl"
  //     style={{
  //       width: "100%",
  //       position: "relative",
  //       aspectRatio: `${width} / ${height}`,
  //     }}
  //   >
  //     <SanityImage
  //       asset={photo}
  //       quality={65}
  //       loading={index <= 2 ? "eager" : "lazy"}
  //     />
  //   </div>
  // );
}
