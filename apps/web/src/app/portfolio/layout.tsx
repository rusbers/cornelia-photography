import { sanityFetch } from "@/lib/sanity/live";
import {
  queryPortfolioIndexPageDescription,
  queryPortfolioNavigationData,
} from "@/lib/sanity/query";
import Link from "next/link";
import PortfolioNavbar from "./portfolio-navbar";
import { HeadlineFlower } from "@/components/icons";

async function fetchPortfolioIndexPageDescription() {
  return await sanityFetch({
    query: queryPortfolioIndexPageDescription,
  });
}

async function fetchPortfolioNavigationData() {
  return await sanityFetch({
    query: queryPortfolioNavigationData,
  });
}

export default async function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const description = await fetchPortfolioIndexPageDescription();
  const navigation = await fetchPortfolioNavigationData();

  return (
    <div className="container">
      <section className="section pt-16">
        <div className="mb-16">
          <div className="flex justify-center mb-5">
            <HeadlineFlower aria-hidden={true} />
          </div>
          <h1 className="heading text-center mb-4">
            {description.data?.title}
          </h1>
          <p className="body-text text-center max-w-[36ch] mx-auto">
            {description.data?.description}
          </p>
        </div>
        {/* @ts-ignore */}
        <PortfolioNavbar className="mb-12" links={navigation.data?.links} />

        {children}
      </section>
    </div>
  );
}
