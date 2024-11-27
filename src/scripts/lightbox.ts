import EmblaCarousel, {
  type EmblaCarouselType,
  type EmblaOptionsType,
} from "embla-carousel";
import {
  addThumbBtnsClickHandlers,
  addToggleThumbBtnsActive,
} from "./lightboxBtn";

document.addEventListener("astro:page-load", () => {
  const OPTIONS: EmblaOptionsType = {
    loop: true,
    duration: 35,
  };
  const OPTIONS_THUMBS: EmblaOptionsType = {
    loop: true,
    duration: 35,
  };

  const viewportNodeMainCarousel = <HTMLElement>(
    document.querySelector(".embla__viewport")
  );
  const viewportNodeThumbCarousel = <HTMLElement>(
    document.querySelector(".embla-thumbs__viewport")
  );
  const emblaApiMain = EmblaCarousel(viewportNodeMainCarousel, OPTIONS);
  const emblaApiThumb = EmblaCarousel(
    viewportNodeThumbCarousel,
    OPTIONS_THUMBS,
  );

  // Add arrow navigation
  const prevButton = document.querySelector(".embla__prev");
  const nextButton = document.querySelector(".embla__next");

  const addArrowNavigation = (emblaApi: EmblaCarouselType): (() => void) => {
    const onPrevButtonClick = (): void => emblaApi.scrollPrev();
    const onNextButtonClick = (): void => emblaApi.scrollNext();

    prevButton?.addEventListener("click", onPrevButtonClick);
    nextButton?.addEventListener("click", onNextButtonClick);

    return (): void => {
      prevButton?.removeEventListener("click", onPrevButtonClick);
      nextButton?.removeEventListener("click", onNextButtonClick);
    };
  };

  const removeArrowNavigation = addArrowNavigation(emblaApiMain);

  const removeThumbBtnsClickHandlers = addThumbBtnsClickHandlers(
    emblaApiMain,
    emblaApiThumb,
  );
  const removeToggleThumbBtnsActive = addToggleThumbBtnsActive(
    emblaApiMain,
    emblaApiThumb,
  );

  emblaApiMain
    .on("destroy", removeThumbBtnsClickHandlers)
    .on("destroy", removeToggleThumbBtnsActive)
    .on("destroy", removeArrowNavigation);

  emblaApiThumb
    .on("destroy", removeThumbBtnsClickHandlers)
    .on("destroy", removeToggleThumbBtnsActive);
});
