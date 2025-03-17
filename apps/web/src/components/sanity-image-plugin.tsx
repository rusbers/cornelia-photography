import { PagebuilderType } from "@/types";
import { SanityImagePluginWrapper } from "./sanity-image-plugin-wrapper";
import { getImageDimensions } from "@sanity/asset-utils";
import { getBlurDataURL } from "./sanity-image";
import { stegaClean } from "next-sanity";
import { cn } from "@workspace/ui/lib/utils";

type SanityImagePluginProps = {
  asset: NonNullable<PagebuilderType<"aboutMe">>["image"];
  width?: number;
  height?: number;
  sizes?: string;
  loading?: "eager" | "lazy";
  quality?: number;
  alt?: string;
  className?: string;
};

export default function SanityImagePlugin({
  asset,
  loading = "lazy",
  quality = 75,
  alt,
  width,
  sizes = "(max-width: 640px) 75vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw",
  className,
  ...props
}: SanityImagePluginProps) {
  if (!asset || !asset.asset) return null;
  const dimensions = getImageDimensions(asset.asset);

  return (
    <SanityImagePluginWrapper
      {...props}
      className={cn("sanity-image-plugin", className)}
      queryParams={{ q: quality }}
      id={asset?.asset?._ref}
      width={width ?? dimensions.width / 2}
      preview={getBlurDataURL(asset).blurDataURL}
      alt={
        stegaClean(asset.imageDescription) ?? stegaClean(asset.alt) ?? "Image"
      }
      aria-label={stegaClean(alt) ?? stegaClean(asset.alt) ?? "Image"}
      sizes={sizes}
    />
  );
}
