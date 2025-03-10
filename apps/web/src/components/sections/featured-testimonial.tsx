import type { PagebuilderType } from "@/types";
import { RichText } from "../richtext";
import { getImageUrl } from "../sanity-image";
import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";
import { Parallax } from "../parallax";

type FeaturedTestimonialBlockProps = PagebuilderType<"featuredTestimonial">;

const parallaxImageFallback =
  "https://cdn.sanity.io/images/4su5il1u/production/7185fa179c2a5296ce3b1c45a3511bd12dd82dfc-2000x1333.jpg?w=2000&h=1333&fm=webp&q=60&fit=max&auto=format";

export function FeaturedTestimonialBlock({
  heading,
  testimonial,
  background,
}: FeaturedTestimonialBlockProps) {
  const parallaxImage = getImageUrl(background);

  return (
    <section id="featuredTestimonial" className="relative section">
      <Parallax parallaxImage={parallaxImage}>
        <div className="container">
          <h2 className="sr-only">{heading}</h2>
          <div className="p-4 bg-white/95 max-w-[50rem] mx-auto">
            <div className="flex flex-col items-center justify-center border-4 px-8 py-14 md:py-20 gap-5 md:px-10">
              <span
                aria-hidden={true}
                className="text-accent-foreground text-8xl size-12 flex justify-center"
              >
                &ldquo;
              </span>
              <blockquote>
                <RichText
                  className="testimonial-content text-center prose-p:text-2xl lg:prose-p:text-[1.75rem] prose-p:font-serif prose-p:font-semibold prose-p:leading-normal prose-p:text-foreground-heading"
                  richText={testimonial?.text}
                />
              </blockquote>
              <p className="text-accent-foreground">
                <span>&mdash; </span>
                {testimonial?.client}
              </p>
            </div>
          </div>
        </div>
      </Parallax>
    </section>
  );
}
