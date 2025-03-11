import { User } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";
import { extensibleRichText } from "../definitions/rich-text";

export const aboutMe = defineType({
  name: "aboutMe",
  title: "About Me",
  description:
    "Description about you. This section will also include the social links indicated in the site settings",
  icon: User,
  type: "object",
  fields: [
    defineField({
      name: "pretitle",
      type: "string",
      description:
        "A short introductory text that appears above the main content.",
    }),
    extensibleRichText(
      ["block"],
      {
        name: "richText",
        title: "Text content",
        description: "The main description about you. Must include H1 heading.",
      },
      {
        styles: ["h1", "h2", "h3"],
        decorators: ["strong", "em", "uppercase"],
      },
    ),
    defineField({
      name: "image",
      title: "Your photo",
      type: "image",
      description: "Upload up to 2 images that best represent you.",
    }),
    defineField({ name: "button", type: "button" }),
  ],
  preview: {
    select: {
      subtitle: "pretitle",
      media: "image",
    },
    prepare: ({ subtitle, media }) => ({
      title: "About Me",
      subtitle,
      media,
    }),
  },
});
