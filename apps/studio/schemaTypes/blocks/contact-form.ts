import { ReceiptText } from "lucide-react";
import { defineField, defineType } from "sanity";

import { customRichText, extensibleRichText } from "../definitions/rich-text";

export const contactForm = defineType({
  name: "contactForm",
  title: "Contact Form",
  type: "object",
  icon: ReceiptText,
  fields: [
    defineField({
      name: "image",
      title: "Background",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Contact Form",
    }),
  },
});
