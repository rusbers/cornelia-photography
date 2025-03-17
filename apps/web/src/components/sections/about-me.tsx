import { type PagebuilderType } from "@/types";
import { RichText } from "../richtext";
import { SanityImage } from "../sanity-image";
import { SanityButton } from "../sanity-buttons";

type AboutMeProps = PagebuilderType<"aboutMe">;

export function AboutMe({ pretitle, richText, button, image }: AboutMeProps) {
  return (
    <section id="aboutMe" className="section pt-10">
      <div className="container max-lg:max-w-[46.875rem]">
        <div className="lg:grid lg:grid-cols-[40%,_1fr] lg:gap-12">
          <div className="lg:pt-10 mb-10 lg:mb-0">
            <p className="pretitle mb-4 text-center lg:text-start">
              {pretitle}
            </p>
            <RichText
              className="prose-p:hidden lg:prose-p:block prose-h1:text-4xl sm:max-lg:prose-h1:text-5xl prose-h1:mb-6 prose-h1:leading-tight prose-p:text-lg prose-p:first-of-type:text-xl mb-6 text-center lg:text-start text-balance"
              richText={richText}
            />
            <div className="hidden lg:block">
              <SanityButton {...button} />
            </div>
          </div>
          <div className="mb-12 fancy-background-bottom lg:mb-0 lg:order-first max-xl:pl-6 max-xl:pr-6 max-xl:pb-6 self-start">
            <SanityImage
              priority
              width={606}
              height={807}
              quality={75}
              asset={image}
              alt={image?.imageDescription || undefined}
              sizes="(max-width: 1024px) 80vw, 30vw"
            />
          </div>
        </div>
        <div className="lg:hidden">
          <RichText
            aria-hidden={true}
            className="prose-h1:hidden prose-h3:text-lg prose-h3:m-0 text-center"
            richText={richText}
          />
        </div>

        <div className="lg:hidden flex justify-center mt-[1.25em]">
          <SanityButton aria-hidden={true} {...button} />
        </div>
      </div>
    </section>
  );
}
