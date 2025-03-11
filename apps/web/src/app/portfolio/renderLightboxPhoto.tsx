import { SanityImage } from "@/components/sanity-image";
import Image, { StaticImageData } from "next/image";
import {
  RenderSlideProps,
  isImageFitCover,
  useLightboxProps,
  useLightboxState,
  isImageSlide,
  Slide,
} from "yet-another-react-lightbox";
import { Photograph } from "./types";

function isNextJsImage(slide: Slide): slide is StaticImageData {
  return (
    isImageSlide(slide) &&
    typeof slide.width === "number" &&
    typeof slide.height === "number"
  );
}

export default function renderLightboxPhoto({
  slide,
  offset,
  rect,
}: RenderSlideProps & { slide: Photograph }) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextJsImage(slide)) return undefined;

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height) * slide.width),
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width) * slide.height),
      )
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <SanityImage
        asset={slide}
        draggable={false}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          userSelect: "none",
          zIndex: 1,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  );
}
