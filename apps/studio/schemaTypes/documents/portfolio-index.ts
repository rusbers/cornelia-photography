import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { ogFields } from "../../utils/og-fields";
import { seoFields } from "../../utils/seo-fields";
import { createSlug, isUnique } from "../../utils/slug";
import { createImagesField } from "../definitions/images";

export const portfolioIndex = defineType({
  name: "portfolioIndex",
  title: "Page",
  type: "document",
  groups: GROUPS,
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: GROUP.MAIN_CONTENT,
      options: {
        source: "title",
        slugify: createSlug,
        isUnique: isUnique,
      },
      validation: (Rule) => Rule.required(),
    }),
    createImagesField({
      name: "photos",
      title: "Featured Photos",
      description:
        "Select photos which you want to include in the 'All' category. Recommended at least 10 photos",
      group: GROUP.MAIN_CONTENT,
    }),
    ...seoFields.filter(
      (field) => !["seoNoIndex", "seoHideFromLists"].includes(field.name),
    ),
    ...ogFields,
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      slug: "slug.current",
    },
    prepare: ({ title, description, slug }) => ({
      title: title || "Untitled Portfolio Index",
      subtitle: description || slug || "Portfolio Index",
    }),
  },
});
