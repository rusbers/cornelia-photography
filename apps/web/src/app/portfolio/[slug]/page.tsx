import { notFound } from "next/navigation";
import { client } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/live";
import {
  queryPortfolioPaths,
  queryPortfolioSlugPageData,
} from "@/lib/sanity/query";
import { getMetaData } from "@/lib/seo";
import Gallery from "../gallery";

async function fetchPortfolioSlugPageData(slug: string) {
  return await sanityFetch({
    query: queryPortfolioSlugPageData,
    params: { slug: `/portfolio/${slug}` },
  });
}

async function fetchPortfolioPaths() {
  const slugs = await client.fetch(queryPortfolioPaths);
  const paths: { slug: string }[] = [];
  for (const slug of slugs) {
    if (!slug) continue;
    const [, , path] = slug.split("/");
    if (path) paths.push({ slug: path });
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await fetchPortfolioSlugPageData(slug);
  if (!data) return getMetaData({});
  return getMetaData(data);
}

export async function generateStaticParams() {
  return await fetchPortfolioPaths();
}

export default async function PortfolioSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await fetchPortfolioSlugPageData(slug);

  if (!data) return notFound();

  const { photos } = data ?? [];

  // TODO create an UI
  if (!photos) return null;

  return <Gallery photos={photos} />;
}
