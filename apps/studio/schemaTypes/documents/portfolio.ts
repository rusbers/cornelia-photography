import { defineArrayMember, defineField, defineType } from "sanity";

import { PathnameFieldComponent } from "../../components/slug-field-component";
import { GROUP, GROUPS } from "../../utils/constant";
import { ogFields } from "../../utils/og-fields";
import { seoFields } from "../../utils/seo-fields";
import { createSlug, isUnique } from "../../utils/slug";
import { createImageField } from "../definitions/image";
import { createImagesField } from "../definitions/images";

export const portfolio = defineType({
  name: "portfolio",
  title: "Portfolio",
  type: "document",
  groups: GROUPS,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      title: "Description",
      name: "description",
      type: "text",
      rows: 3,
      group: GROUP.MAIN_CONTENT,
      validation: (rule) => [
        rule
          .min(140)
          .warning(
            "The meta description should be at least 140 characters for optimal SEO visibility in search results",
          ),
        rule
          .max(160)
          .warning(
            "The meta description should not exceed 160 characters as it will be truncated in search results",
          ),
      ],
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL",
      group: GROUP.MAIN_CONTENT,
      // components: {
      //   field: PathnameFieldComponent,
      // },
      options: {
        source: "title",
        slugify: createSlug,
        isUnique,
      },
      validation: (Rule) => Rule.required(),
    }),
    createImagesField({
      name: "photos",
      title: "Photos",
      group: GROUP.MAIN_CONTENT,
    }),
    ...seoFields,
    ...ogFields,
  ],
  preview: {
    select: {
      title: "title",
      media: "photos.0.asset",
      photos: "photos", // Select the full array
    },
    prepare: ({ title, media, photos }) => ({
      title,
      subtitle: `${Object.keys(photos).length || 0} photos`, // Count photos correctly
      media,
    }),
  },
});
