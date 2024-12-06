import { useState } from "react";

import { MasonryPhotoAlbum, type Photo } from "react-photo-album";
import "react-photo-album/masonry.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <MasonryPhotoAlbum
        photos={photos}
        onClick={({ index }) => setIndex(index)}
        skeleton={<SkeletonMasonry />}
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

const skeletonItems = [
  {
    width: 1200,
    height: 854,
  },
  {
    width: 1200,
    height: 1800,
  },

  {
    width: 1200,
    height: 1800,
  },
  {
    width: 1200,
    height: 828,
  },
  {
    width: 1200,
    height: 854,
  },
  {
    width: 1200,
    height: 1800,
  },
];

function SkeletonMasonry() {
  return (
    <div className="column-1 gap-4 space-y-4 min-[584px]:columns-2 lg:columns-3">
      {skeletonItems.map((item, i) => (
        <img
          key={i}
          className="animate-pulse bg-background-primary"
          src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${item.width / 2} ${item.height / 2}'%3E%3C/svg%3E`}
          width={item.width / 2}
          height={item.height / 2}
          alt=""
        />
      ))}
    </div>
  );
}
