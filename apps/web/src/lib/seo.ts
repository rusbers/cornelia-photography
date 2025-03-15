import type { Metadata } from "next";

import { getBaseUrl } from "@/config";
import type { Maybe } from "@/types";
import { stegaClean } from "next-sanity";

interface OgImageOptions {
  type?: string;
  id?: string;
}

function getOgImage({ type, id }: OgImageOptions = {}): string {
  const params = new URLSearchParams();
  if (id) params.set("id", id);
  if (type) params.set("type", type);
  const baseUrl = getBaseUrl();
  const logoUrl = `${baseUrl}/api/og?${params.toString()}`;
  return logoUrl;
}

interface MetaDataInput {
  _type?: Maybe<string>;
  ogDescription?: Maybe<string>;
  seoDescription?: Maybe<string>;
  seoTitle?: Maybe<string>;
  ogTitle?: Maybe<string>;
  slug?: Maybe<{ current: string | null }> | string | null;
  title?: Maybe<string>;
  description?: Maybe<string>;
  _id?: Maybe<string>;
}

export function getMetaData(data: MetaDataInput): Metadata {
  const {
    _type,
    seoDescription,
    seoTitle,
    slug,
    title,
    description,
    ogDescription,
    ogTitle,
    _id,
  } = data ?? {};

  const baseUrl = getBaseUrl();
  const pageSlug = typeof slug === "string" ? slug : (slug?.current ?? "");
  const pageUrl = `${baseUrl}${pageSlug}`;

  const meta = {
    title: stegaClean(seoTitle) ?? stegaClean(title) ?? "",
    description: stegaClean(seoDescription) ?? stegaClean(description) ?? "",
  };

  const ogImage = getOgImage({
    type: _type ?? undefined,
    id: _id ?? undefined,
  });

  return {
    title: `${meta.title} | Cornelia Photography`,
    description: meta.description,
    metadataBase: new URL(baseUrl),
    creator: "Ruslan Berendeev",
    authors: [{ name: "Ruslan Berendeev" }],
    icons: {
      icon: `${baseUrl}/favicon.ico`,
    },
    keywords: [
      // Core photography keywords
      "photography",
      "professional photographer",
      "travel photographer",
      "destination photographer",
      "adventure photography",
      "lifestyle photography",
      "portrait photography",
      "fine art photography",
      "street photography",
      "candid photography",
      "artistic photography",
      "documentary photography",
      "creative photography",
      "visual storytelling",

      // Travel & location-based keywords
      "travel photography",
      "traveling photographer",
      "nomadic photographer",
      "destination photography",
      "international photographer",
      "freelance photographer",

      // Locations she works in
      // "photographer in Vietnam",
      // "Vietnam photography",
      // "Hanoi photographer",
      // "Ho Chi Minh City photography",
      // "Da Nang photography",
      // "Ha Long Bay photography",
      // "Hoi An photography",
      // "Sapa photography",

      // "photographer in South Korea",
      // "Seoul photography",
      // "Busan photographer",

      // "photographer in Bali",
      // "Bali photography",
      // "Ubud photographer",

      // "photographer in Romania",
      // "Bucharest photography",
      // "Transylvania photographer",
      // "Sibiu photography",

      // "photographer in Moldova",
      // "Chisinau photography",
      // "Moldova travel photography",

      // "photographer in Dublin",
      // "Dublin photography",
      // "Ireland travel photography",
      // "Ireland wedding photographer",

      // "photographer in Europe",
      // "European travel photography",
      // "destination photographer in Europe",

      // Branding & SEO
      "Cornelia Photography",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      countryName: "Ireland",
      description: ogDescription ?? meta.description,
      title: ogTitle ?? meta.title,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: meta.title,
          secureUrl: ogImage,
        },
      ],
      url: pageUrl,
    },
  };
}
