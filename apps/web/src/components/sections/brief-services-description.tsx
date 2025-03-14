import type { PagebuilderType } from "@/types";
import { RichText } from "../richtext";
import { SanityImage } from "../sanity-image";

type BriefServicesDescriptionBlockProps =
  PagebuilderType<"briefServicesDescription">;

export function BriefServicesDescriptionBlock({
  firstText,
  secondText,
  images,
}: BriefServicesDescriptionBlockProps) {
  return (
    <section
      id="briefServicesDescriptionBlock"
      className="section bg-background-secondary"
    >
      <div className="container grid gap-4 lg:gap-12 lg:grid-cols-[1fr_35%]">
        <div className="brief-services-description-top flex flex-col space-y-4">
          <RichText className="prose-h2:mb-5 mb-4" richText={firstText} />
          {images && images.length > 0 && (
            <div className="md:grid md:grid-cols-[1fr_35%] gap-x-4 space-y-4 md:space-y-0 lg:block">
              <SanityImage
                className="md:shrink-0 md:h-full md:object-cover"
                asset={images[0]}
                width={767}
                height={551}
                quality={80}
                sizes="(max-width: 768px) 75vw, 65vw"
              />
              <SanityImage
                aria-hidden={true}
                className="lg:hidden"
                asset={images[1]}
                width={671}
                height={970}
                quality={80}
                sizes="(max-width: 768px) 75vw, 25vw"
              />
            </div>
          )}
        </div>
        <div className="brief-services-description-bottom flex flex-col lg:space-y-7">
          {images && images[1] && (
            <SanityImage
              className="hidden lg:block"
              asset={images[1]}
              width={671}
              height={970}
              quality={80}
              sizes="(max-width: 768px) 75vw, 25vw"
            />
          )}

          <RichText richText={secondText} />
        </div>
      </div>
    </section>
  );
}
