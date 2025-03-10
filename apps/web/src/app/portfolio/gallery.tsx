"use client";

import { useState } from "react";

import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import renderGalleryPhoto from "./renderGalleryPhoto";
import renderLightboxPhoto from "./renderLightboxPhoto";
import { Photograph } from "./types";
import { SkeletonMasonry } from "./gallery-skeleton";

type GalleryProps = {
  photos: Photograph[];
};

export default function Gallery({ photos }: GalleryProps) {
  const [index, setIndex] = useState(-1);

  return (
    // TODO Infinite scrolling
    <>
      <MasonryPhotoAlbum
        // @ts-ignore
        photos={photos}
        render={{ image: renderGalleryPhoto }}
        columns={(containerWidth) => {
          if (containerWidth < 544) return 1;
          if (containerWidth >= 544 && containerWidth < 928) return 2;
          return 3;
        }}
        spacing={30}
        skeleton={<SkeletonMasonry />}
        onClick={({ index }) => setIndex(index)}
      />

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
    </>
  );
}
