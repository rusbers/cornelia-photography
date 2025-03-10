import { type QueryPortfolioIndexPageDataResult } from "@/lib/sanity/sanity.types";
import { type Photo } from "react-photo-album";

export type Photograph = NonNullable<
  NonNullable<QueryPortfolioIndexPageDataResult>["photos"]
>[number];
