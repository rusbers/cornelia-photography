import type { PagebuilderType } from "@/types";
import { RichText } from "../richtext";
import { SanityImage } from "../sanity-image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { HeadlineFlower } from "../icons";

type TestimonialListBlockProps = PagebuilderType<"testimonialList">;

export function TestimonialListBlock({
  pretitle,
  intro,
  testimonials,
}: TestimonialListBlockProps) {
  return (
    <section id="testimonialList" className="section">
      <div className="container">
        <div className="flex flex-col items-center gap-4 mb-16">
          <p className="pretitle">{pretitle}</p>
          <RichText richText={intro} />
        </div>
        <div className="px-10 md:px-14 md:max-w-[64rem] md:mx-auto">
          <Carousel
            className="md:max-w-[48rem] md:mx-auto"
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
          >
            <CarouselContent>
              {testimonials?.map((testimonial) => (
                <CarouselItem
                  className="flex flex-col items-center justify-center md:grid md:grid-cols-[auto_1fr] md:gap-4 lg:gap-6 select-none active:cursor-grab"
                  key={testimonial._id}
                >
                  <div className="max-w-[17.5rem] mb-4 lg:mb-0 shrink-0 lg:justify-self-center lg:fancy-border lg:relative  lg:self-start lg:pl-5 lg:pt-5 lg:before:-z-10">
                    <SanityImage
                      className="size-32 md:size-48 lg:h-full lg:w-[17.5rem] shadow-2xl md:shadow-sm aspect-square lg:aspect-[280/420] object-cover rounded-full lg:rounded-none"
                      asset={testimonial.image}
                      width={280}
                      height={420}
                      quality={75}
                      sizes="(max-width: 1024px) 20vw, 25vw"
                    />
                  </div>
                  <figure className="md:self-center lg:flex lg:flex-col lg:gap-4">
                    <blockquote className="mb-4 lg:mb-0">
                      <RichText
                        className="testimonial-content prose-p:text-foreground-heading/95 prose-p:font-serif prose-p:text-xl text-center md:text-[1.375rem] lg:text-2xl"
                        richText={testimonial.text}
                      />
                    </blockquote>
                    <figcaption className="lg:-order-1">
                      <p className="flex gap-2 label justify-center mb-2 lg:mb-0">
                        <span className="text-muted-foreground">
                          {testimonial.client}
                        </span>
                        <span>&mdash;</span>
                        {testimonial.category}
                      </p>
                    </figcaption>
                    <p className="text-muted-foreground text-base text-center">
                      {testimonial.location?.country},{" "}
                      {testimonial.location?.region}
                    </p>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="-left-12 size-8 min-w-0 min-h-0 md:size-10 md:-left-14 lg:-left-20"
              variant="default"
            />
            <CarouselNext
              className="-right-12 size-8 min-w-0 min-h-0 md:size-10 md:-right-14 lg:-right-20"
              variant="default"
            />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
