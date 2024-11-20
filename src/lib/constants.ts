import type { Contact, NavLink } from "./types";

export const CONTACTS: Contact[] = [
  {
    platform: "instagram",
    link: "https://www.instagram.com/cornelia_photography/",
    identifier: "cornelia.photography",
    contactType: "SOCIAL MEDIA CONTACT",
    id: "instagram",
  },
  {
    platform: "facebook",
    link: "https://www.facebook.com/cornelia.photography",
    identifier: "cornelia.photography",
    contactType: "SOCIAL MEDIA CONTACT",
    id: "facebook",
  },
  {
    platform: "telephone",
    link: "tel:+353852763436",
    identifier: "0852763436",
    contactType: "DIRECT CONTACT",
    id: "telephone",
  },
  {
    platform: "email",
    link: "mailto:cornelia.photography@gmail.com",
    identifier: "cornelia.photography@gmail.com",
    contactType: "DIRECT CONTACT",
    id: "email",
  },
];

export const NAVIGATION_LINKS: NavLink[] = [
  { label: "home", path: "/" },
  { label: "blog", path: "/blog" },
  { label: "gallery", path: "/gallery" },
  { label: "packages", path: "/packages" },
  { label: "about", path: "/about" },
  { label: "contact", path: "/contact" },
];

export const POSSIBLE_CONTACT_PLATFORMS = [
  "instagram",
  "facebook",
  "telephone",
  "email",
] as const;

export const ROOT_GALLERY_FOLDER = "gallery";
export const PHOTO_CATEGORIES = ["couples", "kids", "family"] as const;
