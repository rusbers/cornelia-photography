import Link from "next/link";

import { sanityFetch } from "@/lib/sanity/live";
import { queryFooterData } from "@/lib/sanity/query";
import type { QueryFooterDataResult } from "@/lib/sanity/sanity.types";

import { Facebook, Instagram } from "./icons";
import Whatsapp from "./icons/social/Whatsapp";
import { Logo } from "./logo";
// TODO to change these icons
import { LinkedinIcon, XIcon, YoutubeIcon } from "./social-icons";

interface SocialLinksProps {
  data: NonNullable<QueryFooterDataResult>["socialLinks"];
}

interface FooterProps {
  data: NonNullable<QueryFooterDataResult>;
}

async function fetchFooterData() {
  const response = await sanityFetch({
    query: queryFooterData,
  });
  return response;
}

export async function FooterServer() {
  const footerData = await fetchFooterData();
  // TODO return fallback content
  if (!footerData?.data) return null;
  return <Footer data={footerData.data} />;
}

function SocialLinks({ data }: SocialLinksProps) {
  if (!data) return null;

  const { facebook, twitter, instagram, youtube, linkedin, whatsapp } = data;

  const socialLinks = [
    {
      url: instagram,
      Icon: Instagram,
      label: "Follow me on Instagram",
    },
    { url: facebook, Icon: Facebook, label: "Follow me on Facebook" },
    { url: twitter, Icon: XIcon, label: "Follow me on Twitter" },
    { url: linkedin, Icon: LinkedinIcon, label: "Follow me on LinkedIn" },
    {
      url: youtube,
      Icon: YoutubeIcon,
      label: "Subscribe to my YouTube channel",
    },
    {
      url: `https://wa.me/${whatsapp}`,
      Icon: Whatsapp,
      label: "Contact me on Whatsapp",
    },
  ].filter((link) => link.url);

  return (
    <ul className="flex items-center space-x-6 text-muted-foreground">
      {socialLinks.map(({ url, Icon, label }, index) => (
        <li
          key={`social-link-${url}-${index.toString()}`}
          className="font-medium hover:text-primary"
        >
          <Link
            href={url ?? "#"}
            target="_blank"
            prefetch={false}
            rel="noopener noreferrer"
            aria-label={label}
          >
            <Icon className="size-6" />
            <span className="sr-only">{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FooterSkeleton() {
  return (
    <footer className="bg-background-secondary border-t">
      <div className="container border-b z-50">
        <div className="py-12 space-y-6 flex flex-col items-center">
          <div className="w-[10.3125rem] h-[4.8125rem] bg-[#e7dada] animate-pulse rounded-md" />
          <div className="space-y-2 flex flex-col items-center justify-center">
            <div className="max-w-[30rem] w-[43.75rem] h-4 rounded-md bg-[#e7dada] animate-pulse"></div>
            <div className="max-w-[30rem] w-[20rem] h-4 rounded-md bg-[#e7dada] animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="size-6 rounded-full bg-[#e7dada] animate-pulse" />
            <div className="size-6 rounded-full bg-[#e7dada] animate-pulse" />
            <div className="size-6 rounded-full bg-[#e7dada] animate-pulse" />
          </div>
        </div>
        <div className="py-4 border-t">
          <div className="flex items-center gap-4 justify-center">
            <span className="inline-block size-6 rounded-full bg-[#e7dada] animate-pulse" />
            <span className="inline-block w-44 h-4 rounded-md bg-[#e7dada] animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function Footer({ data }: FooterProps) {
  const { subtitle, socialLinks, logo, siteTitle } = data;
  const year = new Date().getFullYear();

  // return <FooterSkeleton />;

  return (
    <div>
      <footer className="bg-background-secondary border-t">
        <div className="container border-b">
          <div className="py-12 space-y-6 flex flex-col items-center">
            <Logo src={logo} alt={siteTitle} priority />
            {subtitle && (
              <p className="body-text-sm text-center balance md:max-w-[30rem] mx-auto">
                {subtitle}
              </p>
            )}

            {socialLinks && <SocialLinks data={socialLinks} />}
          </div>
          <div className="py-4 border-t">
            <small className="text-base text-center block">
              &copy; {year} {siteTitle}
            </small>
          </div>
        </div>
      </footer>
    </div>
  );
}
