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
      <div className="container">
        <RichText
          aria-hidden={true}
          className="prose-h2:mb-5 mb-4 lg:hidden"
          richText={firstText}
        />
        <div className="grid gap-4 lg:gap-12 md:grid-cols-[1fr_35%]">
          {images && images.length > 0 && (
            <>
              <div className="md:flex lg:block">
                <RichText
                  className="prose-h2:mb-5 mb-4 hidden lg:block"
                  richText={firstText}
                />
                <SanityImage
                  className="md:object-cover lg:object-contain"
                  asset={images[0]}
                  alt={images[0]?.imageDescription || undefined}
                  sizes="(min-width: 1440px) 768px, (min-width: 1040px) 53.42vw, (min-width: 780px) calc(78.33vw - 71px), (min-width: 640px) calc(100vw - 96px), calc(100vw - 40px)"
                />
              </div>
              <div>
                <SanityImage
                  asset={images[1]}
                  alt={images[1]?.imageDescription || undefined}
                  sizes="(min-width: 1440px) 439px, (min-width: 780px) 31.25vw, (min-width: 640px) calc(100vw - 96px), calc(100vw - 40px)"
                />
                <RichText className="hidden lg:block" richText={secondText} />
              </div>
            </>
          )}
        </div>
        <RichText
          className="lg:hidden"
          aria-hidden={true}
          richText={secondText}
        />
      </div>
    </section>
  );
}
