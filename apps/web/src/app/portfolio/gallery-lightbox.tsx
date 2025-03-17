import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import renderLightboxPhoto from "./renderLightboxPhoto";
import { type SetStateAction } from "react";

export function GalleryLightbox({
  index,
  setIndex,
}: {
  index: number;
  setIndex: (value: SetStateAction<number>) => void;
}) {
  return (
    <Lightbox
      // @ts-ignore
      slides={photos}
      open={index >= 0}
      index={index}
      close={() => setIndex(-1)}
      // @ts-ignore
      render={{ slide: renderLightboxPhoto, thumbnail: renderLightboxPhoto }}
      plugins={[Thumbnails]}
    />
  );
}
