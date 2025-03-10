import { Briefcase, User } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";
import { extensibleRichText } from "../definitions/rich-text";

export const mySpecialities = defineType({
  name: "mySpecialities",
  title: "My Specialities",
  icon: Briefcase,
  type: "object",
  fields: [
    defineField({
      name: "pretitle",
      type: "string",
    }),
    extensibleRichText(
      ["block"],
      {
        name: "heading",
        title: "Heading",
      },
      {
        styles: ["h2"],
        lists: [],
        decorators: ["strong", "em"],
      },
    ),
    extensibleRichText(
      ["block"],
      {
        name: "richText",
        title: "Text content",
      },
      {
        styles: ["normal", "h3"],
        decorators: ["strong", "em", "uppercase"],
      },
    ),
    defineField({
      name: "photos",
      description: "Upload up to 2 vertical photos",
      type: "array",
      of: [defineArrayMember({ name: "photo", type: "image" })],
    }),
    defineField({ name: "button", type: "button" }),
  ],
  preview: {
    select: {
      subtitle: "pretitle",
      media: "photo",
    },
    prepare: ({ subtitle, media }) => ({
      title: "My Specialities",
      subtitle,
      media,
    }),
  },
});
