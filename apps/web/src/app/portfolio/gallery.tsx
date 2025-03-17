"use client";

import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";

import renderGalleryPhoto from "./renderGalleryPhoto";
import { type Photograph } from "./types";
import { SkeletonMasonry } from "./gallery-skeleton";

type GalleryProps = {
  photos: Photograph[];
};

export default function Gallery({ photos }: GalleryProps) {
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
        // onClick={({ index }) => setIndex(index)}
      />
    </>
  );
}
