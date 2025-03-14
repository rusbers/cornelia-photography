import type { PagebuilderType } from "@/types";
import { RichText } from "../richtext";
import { SanityButton } from "../sanity-buttons";
import { SanityImage } from "../sanity-image";
import { cn } from "@workspace/ui/lib/utils";

type HeroBlockProps = PagebuilderType<"hero">;

export function HeroBlock({ richText, images, button }: HeroBlockProps) {
  return (
    <section id="hero" className="section pt-5">
      <div
        className={cn(
          "container flex flex-col items-center gap-x-16 lg:grid lg:grid-cols-[1fr,_40%] lg:gap-y-12",
          images && images.length > 1 && "xl:grid-cols-[38%,_1fr]",
        )}
      >
        <div className="flex flex-col gap-y-7">
          <RichText
            className="prose-h1:max-md:text-[2.5rem] prose-h1:max-md:leading-tight prose-h1:mb-7 prose-p:first-of-type:mt-0 prose-p:mt-4 prose-p:text-balance"
            richText={richText}
          />
          <SanityButton className="self-start" {...button} />
        </div>
        <ImageDisplay images={images} />
      </div>
    </section>
  );
}

const COMMON_IMAGES_CONTAINER_STYLES =
  "fancy-background -order-1 mb-16 lg:order-2 lg:mb-0 self-center w-full";

const SingleImageComponent = ({
  images,
}: {
  images: HeroBlockProps["images"];
}) => {
  if (!images || images.length !== 1) return null;

  return (
    <div
      className={cn(
        COMMON_IMAGES_CONTAINER_STYLES,
        "max-w-[28.125rem] lg:w-full",
      )}
    >
      <SanityImage
        className="w-full"
        key={images[0]?._key}
        asset={images[0]}
        width={623}
        height={945}
        quality={75}
        loading="eager"
      />
    </div>
  );
};

const MultipleImagesComponent = ({
  images,
}: {
  images: HeroBlockProps["images"];
}) => {
  if (!images || images.length <= 1) return null;

  return (
    <div
      className={cn(
        COMMON_IMAGES_CONTAINER_STYLES,
        "max-w-[28.125rem] sm:max-w-none grid gap-12 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 md:self-start",
      )}
    >
      {images.map((image) => (
        <SanityImage
          className={cn(
            "w-full",
            "last-of-type:hidden last-of-type:sm:block last-of-type:lg:hidden last-of-type:xl:block",
          )}
          key={image._key}
          asset={image}
          width={623}
          height={945}
          quality={75}
          loading="eager"
        />
      ))}
    </div>
  );
};

const ImageDisplay = ({ images }: { images: HeroBlockProps["images"] }) => {
  if (!images || images.length === 0) return null;

  return images.length === 1 ? (
    <SingleImageComponent images={images} />
  ) : (
    <MultipleImagesComponent images={images} />
  );
};
