import { defineCollection, z } from "astro:content";
import { cldAssetsLoader } from "astro-cloudinary/loaders";
import { PHOTO_CATEGORIES } from "@/lib/constants";

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    category: z.enum(PHOTO_CATEGORIES),
    date: z.string(),
    bannerId: z.string(),
    contentImageId: z.string().optional(),
    review: z.string().optional(),
  }),
});

const galleryCollections = Object.fromEntries(
  PHOTO_CATEGORIES.map((category) => [
    category,
    defineCollection({
      loader: cldAssetsLoader({
        folder: `gallery/${category}`,
        metadata: true,
      }),
    }),
  ]),
);

// TODO to add metadata: true

const heroSectionImages = defineCollection({
  loader: cldAssetsLoader({ folder: "hero", limit: 2 }),
});

const servicesSectionImages = defineCollection({
  loader: cldAssetsLoader({ folder: "services", limit: 2 }),
});

const testimonialsSectionImages = defineCollection({
  loader: cldAssetsLoader({ folder: "testimonials" }),
});

const blogImages = defineCollection({
  loader: cldAssetsLoader({ folder: "blog" }),
});

const packagesImages = defineCollection({
  loader: cldAssetsLoader({ folder: "packages" }),
});

const specialitiesImages = defineCollection({
  loader: cldAssetsLoader({
    folder: "my-specialities",
    limit: 2,
    metadata: true,
  }),
});

const aboutMeImages = defineCollection({
  loader: cldAssetsLoader({
    folder: "about-me",
    limit: 1,
    metadata: true,
  }),
});

export const collections = {
  posts: postsCollection,
  heroImages: heroSectionImages,
  services: servicesSectionImages,
  testimonials: testimonialsSectionImages,
  blogImages: blogImages,
  packages: packagesImages,
  specialitiesImages,
  aboutMeImages,
  ...galleryCollections,
} as const;
