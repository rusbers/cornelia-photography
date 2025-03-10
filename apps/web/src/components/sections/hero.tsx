import type { PagebuilderType } from "@/types";
import { RichText } from "../richtext";
import { SanityButton } from "../sanity-buttons";
import { SanityImage } from "../sanity-image";

type HeroBlockProps = PagebuilderType<"hero">;

export function HeroBlock({ richText, images, button }: HeroBlockProps) {
  return (
    <section id="hero" className="section pt-5">
      <div className="container flex flex-col items-center gap-x-16 lg:grid lg:grid-cols-[1fr,_40%] lg:gap-y-12 xl:grid-cols-[35%,_1fr]">
        <div className="flex flex-col gap-y-7">
          <RichText
            className="prose-h1:text-[2.75rem] prose-h1:md:text-[3.25rem]"
            richText={richText}
          />
          <SanityButton className="self-start" {...button} />
        </div>
        <div className="fancy-background -order-1 mb-16 grid gap-12 sm:grid-cols-2 lg:order-2 lg:mb-0 lg:grid-cols-1 xl:grid-cols-2 self-center md:self-start md:w-full">
          {images &&
            images.map((image) => (
              <SanityImage
                className="w-full last-of-type:hidden last-of-type:sm:block last-of-type:lg:hidden last-of-type:xl:block"
                key={image._key}
                asset={image}
                width={623}
                height={945}
                priority
                quality={80}
                loading="eager"
              />
            ))}
        </div>
      </div>
    </section>
  );
}
