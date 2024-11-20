import type { CollectionEntry } from "astro:content";
import type { PHOTO_CATEGORIES, POSSIBLE_CONTACT_PLATFORMS } from "./constants";

export type ContactPlatform = (typeof POSSIBLE_CONTACT_PLATFORMS)[number];

export type PhotoCategories = (typeof PHOTO_CATEGORIES)[number];

export type ImageType = CollectionEntry<PhotoCategories>;

export type Testimonial = {
  image: string;
  mainQuote: string;
  quotes: string[];
  author: string;
  category: PhotoCategories;
  id: string;
};

export type Contact = {
  platform: ContactPlatform;
  link: string;
  identifier: string;
  contactType: "SOCIAL MEDIA CONTACT" | "DIRECT CONTACT";
  id: string;
};

export type NavLink = {
  label: string;
  path: string;
};

export type CloudinaryResource = {
  asset_id: string;
  bytes: number;
  created_at: string;
  format: string;
  height: number;
  public_id: string;
  resource_type: string;
  secure_url: string;
  tags: Array<string>;
  width: number;
};
