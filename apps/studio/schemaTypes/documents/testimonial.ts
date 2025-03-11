import { defineField, defineType } from "sanity";
import { MessageSquareQuote } from "lucide-react";
import { extensibleRichText } from "../definitions/rich-text";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  icon: MessageSquareQuote,
  type: "document",
  fields: [
    defineField({
      name: "client",
      type: "string",
    }),
    defineField({
      name: "category",
      type: "reference",
      to: { type: "portfolio", options: { disableNew: true } },
      options: { disableNew: true },
    }),
    defineField({
      name: "location",
      type: "reference",
      to: { type: "photoLocation" },
    }),
    extensibleRichText(
      ["block"],
      { name: "text", title: "Testimonial" },
      { styles: ["h3", "normal"], decorators: ["strong", "em"] },
    ),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      client: "client",
      media: "image",
      category: "category.title",
    },
    prepare: ({ client, category, media }) => ({
      title: client || "No author",
      subtitle: category,
      media,
    }),
  },
});
