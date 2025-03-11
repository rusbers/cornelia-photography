import { type PagebuilderType } from "@/types";
import { RichText } from "../richtext";
import { SanityImage } from "../sanity-image";
import { SanityButton } from "../sanity-buttons";

type AboutMeProps = PagebuilderType<"aboutMe">;

export function AboutMe({ pretitle, richText, button, image }: AboutMeProps) {
  return (
    <section id="aboutMe" className="section pt-10">
      <div className="container">
        <div className="lg:grid lg:grid-cols-[40%,_1fr] lg:gap-12">
          <div className="lg:pt-10 mb-4 lg:mb-0">
            <p className="pretitle mb-4">{pretitle}</p>
            <RichText
              className="prose-p:hidden lg:prose-p:block prose-h1:text-4xl prose-h1:mb-6 prose-h1:leading-tight prose-p:text-lg prose-p:first-of-type:text-xl mb-6"
              richText={richText}
            />
            <div className="hidden lg:block">
              <SanityButton {...button} />
            </div>
          </div>
          <div className="mb-12 md:fancy-background-bottom lg:mb-0 lg:order-first">
            <SanityImage
              loading="eager"
              width={831}
              height={1108}
              quality={75}
              asset={image}
            />
          </div>
        </div>
        <div className="lg:hidden">
          <RichText
            aria-hidden={true}
            className="prose-h1:hidden prose-h3:text-lg prose-h3:m-0"
            richText={richText}
          />
        </div>

        <div className="lg:hidden">
          <SanityButton aria-hidden={true} {...button} />
        </div>
      </div>
    </section>
  );
}
