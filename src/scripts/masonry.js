import masonry from "data-masonry";
import imagesLoaded from "imagesloaded";

function initMasonry() {
  const existingMasonryContainers = document.querySelectorAll("[data-masonry]");
  existingMasonryContainers.forEach((container) => {
    if (container.masonry && typeof container.masonry.destroy === "function") {
      container.masonry.destroy();
    }
  });

  const masonryContainers = document.querySelectorAll("[data-masonry]");

  masonryContainers.forEach((container) => {
    imagesLoaded(container, () => {
      masonry(container);
    });
  });
}

if ("MutationObserver" in window) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        initMasonry();
        break;
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

document.addEventListener("astro:before-swap", initMasonry);
document.addEventListener("astro:page-load", initMasonry);

initMasonry();
