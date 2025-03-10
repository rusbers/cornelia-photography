import { ReceiptText } from "lucide-react";
import { defineType } from "sanity";

import { customRichText, extensibleRichText } from "../definitions/rich-text";

export const contactForm = defineType({
  name: "contactForm",
  title: "Contact Form",
  type: "object",
  icon: ReceiptText,
  fields: [
    extensibleRichText(
      ["block"],
      { name: "intro", title: "Intro" },
      {
        styles: ["h2", "h3", "normal"],
        lists: [],
        decorators: ["strong", "em"],
      },
    ),
  ],
  preview: {
    prepare: () => ({
      title: "Contact Form",
    }),
  },
});
