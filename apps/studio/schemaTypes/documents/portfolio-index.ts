import { defineArrayMember, defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { ogFields } from "../../utils/og-fields";
import { seoFields } from "../../utils/seo-fields";
import { createSlug, isUnique } from "../../utils/slug";
import { pageBuilderField } from "../common";

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
    defineField({
      name: "photos",
      title: "Featured Photos",
      description:
        "Select photos which you want to include in the 'All' category. Recommended at least 10 photos",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
        }),
      ],
      validation: (rule) => rule.min(10),
      options: { layout: "grid" },
      group: GROUP.MAIN_CONTENT,
    }),
    // defineField({
    //   name: "featured",
    //   title: "Featured Blogs",
    //   description:
    //     "Select up to 3 blogs to feature on this page. These blogs will be displayed prominently on the page.",
    //   type: "array",
    //   of: [
    //     defineArrayMember({
    //       type: "reference",
    //       to: [
    //         {
    //           type: "blog",
    //           options: { disableNew: true },
    //         },
    //       ],
    //       validation: (rule) => [rule.required()],
    //     }),
    //   ],
    //   validation: (rule) => [rule.max(1), rule.unique()],
    //   group: GROUP.MAIN_CONTENT,
    // }),
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
