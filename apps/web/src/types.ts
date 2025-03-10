import type { QueryHomePageDataResult } from "./lib/sanity/sanity.types";

export type PageBuilderBlockTypes = NonNullable<
  NonNullable<QueryHomePageDataResult>["pageBuilder"]
>[number]["_type"];

export type PagebuilderType<T extends PageBuilderBlockTypes> = Extract<
  NonNullable<NonNullable<QueryHomePageDataResult>["pageBuilder"]>[number],
  { _type: T }
>;

// TODO update types
export type SanityButtonProps = NonNullable<
  //@ts-ignore
  NonNullable<PagebuilderType<"hero">>["buttons"]
>[number];

// TODO update types
export type SanityImageProps = NonNullable<
  //@ts-ignore
  NonNullable<PagebuilderType<"hero">>["image"]
>;

export type SanityRichTextProps = NonNullable<
  NonNullable<PagebuilderType<"hero">>["richText"]
>;

export type SanityRichTextBlock = Extract<
  NonNullable<NonNullable<SanityRichTextProps>[number]>,
  { _type: "block" }
>;

export type Maybe<T> = T | null | undefined;
