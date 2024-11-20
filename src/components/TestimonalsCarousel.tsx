import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TESTIMONIALS } from "@/lib/mockData";

export const TestimonialsCarousel = () => {
  return (
    <Carousel opts={{ loop: true, duration: 35 }} className="md:px-28">
      <CarouselContent>
        {TESTIMONIALS.map((testimonial) => (
          <CarouselItem key={testimonial.id}>
            <div className="grid gap-4 lg:grid-cols-[18.75rem,_1fr] lg:gap-11">
              <div className="testimonial-img-wrapper fancy-border relative hidden pl-5 pt-5 before:-z-10 lg:block">
                <img
                  className="testimonial-img"
                  src={testimonial.image}
                  width="355"
                  alt="some alt text"
                />
              </div>
              <figure className="flex flex-col">
                <blockquote className="flex flex-col gap-7">
                  <p className="main-quote font-serif text-[28px] font-normal leading-snug">
                    &quot;{testimonial.mainQuote}&quot;
                  </p>
                  <div className="flex flex-col gap-7 text-lg font-normal">
                    {testimonial.quotes.map((quote: string, index: number) => {
                      return <p key={index}>&quot;{quote}&quot;</p>;
                    })}
                  </div>
                </blockquote>
                <figcaption className="content-label -order-1 mb-5">
                  <span className="author">{testimonial.author}</span>
                  <span className="px-2">&mdash;</span>
                  <span className="category text-accent-foreground">
                    {testimonial.category}
                  </span>
                </figcaption>
              </figure>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-7 flex justify-end gap-4 md:mt-0">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};
