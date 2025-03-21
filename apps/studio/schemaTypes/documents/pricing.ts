import { defineField, defineType } from "sanity";
import { extensibleRichText } from "../definitions/rich-text";
import { Euro } from "lucide-react";
import { createImageField } from "../definitions/image";

export const pricing = defineType({
  name: "pricing",
  title: "Pricing tier",
  type: "document",
  icon: Euro,
  fields: [
    defineField({
      name: "category",
      title: "Category",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
    extensibleRichText(
      ["block"],
      {
        name: "content",
        title: "Content",
        description: "use bullet list",
      },
      { styles: ["normal"], decorators: ["strong", "em"], lists: ["bullet"] },
    ),
    createImageField({ validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: {
      title: "category",
      price: "price",
      image: "image",
    },
    prepare: ({ title, price, image }) => {
      return {
        title,
        subtitle: `Price: ${price || 0}`,
        media: image,
      };
    },
  },
});
