import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextReactComponents,
} from "next-sanity";

import { parseChildrenToSlug } from "@/utils";

import { SanityImage } from "./sanity-image";

const components: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => <p className="body-text">{children}</p>,
    h1: ({ children, value }) => {
      const slug = parseChildrenToSlug(value.children);
      return (
        <h1 id={slug} className="scroll-m-20 heading">
          {children}
        </h1>
      );
    },
    h2: ({ children, value }) => {
      const slug = parseChildrenToSlug(value.children);
      return (
        <h2 id={slug} className="scroll-m-20 heading">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const slug = parseChildrenToSlug(value.children);
      return (
        <h3 id={slug} className="scroll-m-20 heading">
          {children}
        </h3>
      );
    },
    h4: ({ children, value }) => {
      const slug = parseChildrenToSlug(value.children);
      return (
        <h4 id={slug} className="scroll-m-20 heading">
          {children}
        </h4>
      );
    },
    h5: ({ children, value }) => {
      const slug = parseChildrenToSlug(value.children);
      return (
        <h5 id={slug} className="scroll-m-20 heading">
          {children}
        </h5>
      );
    },
    h6: ({ children, value }) => {
      const slug = parseChildrenToSlug(value.children);
      return (
        <h6 id={slug} className="scroll-m-20 heading">
          {children}
        </h6>
      );
    },
    inline: ({ children }) => <span className="text-lg">{children}</span>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-medium">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="font-accent text-foreground-heading">{children}</em>
    ),
    small: ({ children }) => <span className="text-lg">{children}</span>,
    uppercase: ({ children }) => (
      <span className="text-uppercase">{children}</span>
    ),
    code: ({ children }) => (
      <code className="rounded-md border-[1px] border-white border-opacity-10  bg-opacity-5 p-1 text-sm  lg:whitespace-nowrap">
        {children}
      </code>
    ),
    customLink: ({ children, value }) => {
      if (!value.href || value.href === "#") {
        console.warn("🚀 link is not set", value);
        return (
          <span className="underline decoration-dotted underline-offset-2">
            Link Broken
          </span>
        );
      }
      return (
        <Link
          className="underline decoration-dotted underline-offset-2"
          href={value.href}
          prefetch={false}
          aria-label={`Link to ${value?.href}`}
          target={value.openInNewTab ? "_blank" : "_self"}
        >
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc body-text">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal body-text">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="">{children}</li>,
    number: ({ children }) => <li className="">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      return (
        <div className="my-4">
          <SanityImage
            asset={value}
            className="w-full h-auto rounded-lg"
            width={1600}
            height={900}
          />
        </div>
      );
    },
  },
  hardBreak: () => <br />,
};

export function RichText<T>({
  richText,
  className,
}: {
  richText?: T | null;
  className?: string;
}) {
  if (!richText) return null;

  return (
    <div
      className={cn(
        // "prose prose-slate prose-headings:scroll-m-24 prose-headings:font-bold prose-headings:text-opacity-90 prose-p:text-opacity-80 prose-a:underline prose-a:decoration-dotted prose-ol:list-decimal prose-ol:text-opacity-80 prose-ul:list-disc prose-ul:text-opacity-80 prose-h2:border-b prose-h2:pb-2 prose-h2:text-3xl prose-h2:font-semibold prose-h2:prose-h2:first:mt-0 max-w-none",
        "prose prose-headings:heading prose-headings:scroll-m-24 prose-p:body-text prose-p:text-foreground max-w-none",
        className,
      )}
    >
      <PortableText
        value={richText as unknown as PortableTextBlock[]}
        components={components}
        onMissingComponent={(_, { nodeType, type }) =>
          console.log("missing component", nodeType, type)
        }
      />
    </div>
  );
}
