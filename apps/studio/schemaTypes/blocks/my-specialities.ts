import { Briefcase, User } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";
import { extensibleRichText } from "../definitions/rich-text";
import { createImagesField } from "../definitions/images";

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
    createImagesField({
      description: "Upload 2 vertical images to mentain the section structure.",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(2)
          .warning("You must upload 2 vertical images."),
    }),
    // defineField({
    //   name: "images",
    //   title: "Images",
    //   description: "Upload 2 vertical images to mentain the section structure.",
    //   type: "array",
    //   of: [
    //     defineArrayMember({
    //       type: "image",
    //       options: { hotspot: true },
    //     }),
    //   ],
    //   options: { layout: "grid" },
    //   validation: (Rule) =>
    //     Rule.required()
    //       .min(2)
    //       .max(2)
    //       .warning("You must upload 2 vertical images."),
    // }),
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
