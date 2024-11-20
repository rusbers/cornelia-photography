import { defineCollection, z } from "astro:content";
import { cldAssetsLoader } from "astro-cloudinary/loaders";
import { PHOTO_CATEGORIES } from "@/lib/constants";

const postsCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      author: z.string(),
      date: z.string(),
      image: image(),
      category: z.enum(PHOTO_CATEGORIES),
      title: z.string(),
      // review: z.string().optional(),
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

export const collections = {
  posts: postsCollection,
  ...galleryCollections,
} as const;
