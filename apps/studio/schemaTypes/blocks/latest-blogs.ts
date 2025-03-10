import { Rss } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";
import { ValidationContext } from "sanity";

interface LatestBlogsFields {
  showFeatured?: boolean;
}

export const latestBlogs = defineType({
  name: "latestBlogs",
  title: "Latest Blogs",
  icon: Rss,
  type: "object",
  fields: [
    defineField({
      name: "richText",
      title: "Text content",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "showFeatured",
      title: "Show featured blogs",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "featuredBlogs",
      title: "Featured Blogs",
      description:
        "Select exactly 2 blogs to display instead of the two latest blogs",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [
            {
              type: "blog",
              options: { disableNew: true },
            },
          ],
        }),
      ],
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as LatestBlogsFields;

          // If showFeatured is true, require exactly 2 blogs
          if (parent?.showFeatured) {
            if (!value || value.length !== 2) {
              return "Exactly 2 featured blogs are required when 'Show featured blogs' is checked";
            }
          }

          return true;
        }),
      hidden: ({ parent }) => !(parent as LatestBlogsFields)?.showFeatured,
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Latest Blogs",
      media: Rss,
    }),
  },
});
