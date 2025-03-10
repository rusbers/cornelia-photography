import Image from "next/image";
import Link from "next/link";
import { stegaClean } from "next-sanity";

import type { Maybe, SanityImageProps } from "@/types";

import { SanityImage } from "./sanity-image";
import { cn } from "@workspace/ui/lib/utils";

const LOGO_URL =
  "https://cdn.sanity.io/images/4su5il1u/production/c6ac8579a9df769f8f0081b7a852642cd4755de9-235x110.svg";

interface LogoProps {
  src?: Maybe<string>;
  image?: Maybe<SanityImageProps>;
  alt?: Maybe<string>;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

const baseLogoClasses = "w-[165px] h-[77px]";

export function Logo({
  src,
  alt = "logo",
  image,
  width = 165,
  height = 77,
  priority = true,
  className,
}: LogoProps) {
  return (
    <Link href="/" className="">
      {image ? (
        <SanityImage
          asset={image}
          alt={stegaClean(alt) ?? "logo"}
          width={width}
          className={cn(baseLogoClasses, className)}
          height={height}
          priority={priority}
          loading="eager"
          decoding="sync"
          quality={100}
        />
      ) : (
        <Image
          src={src ?? LOGO_URL}
          alt={stegaClean(alt) ?? "logo"}
          width={width}
          className={cn(baseLogoClasses, className)}
          height={height}
          loading="eager"
          priority={priority}
          decoding="sync"
        />
      )}
    </Link>
  );
}
