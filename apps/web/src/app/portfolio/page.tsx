import { sanityFetch } from "@/lib/sanity/live";
import { queryPortfolioIndexPageData } from "@/lib/sanity/query";
import { getMetaData } from "@/lib/seo";
import Gallery from "./gallery";

async function fetchPortfolioIndexPageData() {
  return await sanityFetch({
    query: queryPortfolioIndexPageData,
  });
}

export async function generateMetadata() {
  const { data } = await fetchPortfolioIndexPageData();
  if (!data) return getMetaData({});
  return getMetaData(data);
}

export default async function PortfolioIndexPage() {
  const { data } = await fetchPortfolioIndexPageData();
  // TODO if !data return some UI
  if (!data?.photos) return null;

  const { photos } = data;

  return <Gallery photos={photos} />;
}
