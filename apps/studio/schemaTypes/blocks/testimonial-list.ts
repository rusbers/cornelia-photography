import { defineField, defineType } from "sanity";
import { MessageSquareQuote } from "lucide-react";
import { extensibleRichText } from "../definitions/rich-text";

export const testimonialList = defineType({
  name: "testimonialList",
  title: "Testimonial list",
  icon: MessageSquareQuote,
  type: "object",
  fields: [
    defineField({
      name: "pretitle",
      type: "string",
    }),
    extensibleRichText(
      ["block"],
      { name: "intro", title: "Intro" },
      { styles: ["h2", "normal"], decorators: ["strong", "em"] },
    ),
    defineField({
      name: "testimonials",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
      validation: (Rule) => Rule.min(3),
    }),
  ],
});
