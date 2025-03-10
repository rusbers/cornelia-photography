import { defineField, defineType } from "sanity";
import { MessageSquareQuote } from "lucide-react";

export const featuredTestimonial = defineType({
  name: "featuredTestimonial",
  title: "Featured Testimonial",
  icon: MessageSquareQuote,
  type: "object",
  fields: [
    defineField({
      name: "heading",
      type: "string",
      description: "It is required, but this will be visually hidden.",
      initialValue: "Featured testimonial",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "testimonial",
      description: "Choose one testimonial",
      type: "reference",
      to: { type: "testimonial", options: { disableNew: true } },
      options: { disableNew: true },
    }),
    defineField({
      name: "background",
      type: "image",
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Featured Testimonial",
    }),
  },
});
