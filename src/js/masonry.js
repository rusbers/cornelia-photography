import masonry from "data-masonry";

function initMasonry() {
  // Remove any existing masonry instances first
  const existingMasonryContainers = document.querySelectorAll("[data-masonry]");
  existingMasonryContainers.forEach((container) => {
    // If data-masonry has a destroy method, use it
    if (container.masonry && typeof container.masonry.destroy === "function") {
      container.masonry.destroy();
    }
  });

  // Re-initialize masonry
  masonry();
}

// Initial load
document.addEventListener("astro:before-swap", initMasonry);

// Use MutationObserver to detect page changes in Astro View Transitions
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

// If using Astro View Transitions, add an event listener
document.addEventListener("astro:page-load", initMasonry);
