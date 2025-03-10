import { Star } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";
import { extensibleRichText } from "../definitions/rich-text";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  icon: Star,
  type: "object",
  fields: [
    extensibleRichText(
      ["block"],
      {
        name: "richText",
        title: "Text content",
        description:
          "Ensure the web page includes only a single <h1> tag and a single hero section to maintain proper structure and accessibility.",
      },
      {
        styles: ["h1"],
        decorators: ["strong", "em"],
        lists: ["bullet", "number"],
      },
    ),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
        }),
      ],
      options: { layout: "grid" },
      description:
        "Upload up to 2 vertical images to mentain the section structure.",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(2)
          .warning("You must upload at least 1 and at most 2 images."),
    }),
    defineField({ name: "button", type: "button" }),
  ],
  preview: {
    select: {
      images: "images",
    },
    prepare: ({ images }) => ({
      title: "Hero",
      media: images[0],
    }),
  },
});
