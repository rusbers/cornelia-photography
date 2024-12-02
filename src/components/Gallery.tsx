import { useState } from "react";

import { MasonryPhotoAlbum, type Photo } from "react-photo-album";
import "react-photo-album/masonry.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Masonry from "react-masonry-css";

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <MasonryPhotoAlbum
        photos={photos}
        onClick={({ index }) => setIndex(index)}
        skeleton={<SkeletonMasonry photos={photos} />}
        spacing={16}
        columns={(containerWidth) => {
          if (containerWidth < 544) return 1;
          if (containerWidth >= 544 && containerWidth < 928) return 2;
          return 3;
        }}
      />
      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Thumbnails]}
      />
    </>
  );
}

function SkeletonMasonry({ photos }: { photos: Photo[] }) {
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    584: 1,
  };
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="skeleton-masonry-grid"
      columnClassName="skeleton-masonry-grid__column"
    >
      {photos.map((photo, i) => (
        <img
          key={i}
          className="animate-pulse bg-background-primary"
          src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${photo.width} ${photo.height}'%3E%3C/svg%3E`}
          width={photo.width}
          height={photo.height}
          alt=""
        />
      ))}
    </Masonry>
  );
}
