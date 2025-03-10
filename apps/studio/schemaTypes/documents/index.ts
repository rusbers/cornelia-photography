import { author } from "./author";
import { blog } from "./blog";
import { blogIndex } from "./blog-index";
import { faq } from "./faq";
import { footer } from "./footer";
import { homePage } from "./home-page";
import { navbar } from "./navbar";
import { page } from "./page";
import { photoLocation } from "./photo-location";
import { portfolio } from "./portfolio";
import { portfolioIndex } from "./portfolio-index";
import { portfolioNavigation } from "./portfolio-navigation";
import { pricing } from "./pricing";
import { settings } from "./settings";
import { testimonial } from "./testimonial";

export const singletons = [
  homePage,
  blogIndex,
  portfolioIndex,
  settings,
  footer,
  navbar,
  portfolioNavigation,
];

export const documents = [
  blog,
  portfolio,
  page,
  faq,
  author,
  testimonial,
  photoLocation,
  pricing,
  ...singletons,
];
