import { defineArrayMember, defineField, defineType } from "sanity";
import { BriefcaseBusiness } from "lucide-react";
import { extensibleRichText } from "../definitions/rich-text";

export const briefServicesDescription = defineType({
  name: "briefServicesDescription",
  title: "Brief Services Description",
  icon: BriefcaseBusiness,
  type: "object",
  fields: [
    extensibleRichText(
      ["block"],
      { name: "firstText", title: "Main text" },
      { styles: ["h2", "normal"], lists: [], decorators: ["strong", "em"] },
    ),
    extensibleRichText(
      ["block"],
      { name: "secondText", title: "Secondary text" },
      { styles: ["normal"], lists: [], decorators: ["strong", "em", "small"] },
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
        "Upload two images: one horizontal and one vertical to maintain the section's structure.",
      validation: (Rule) =>
        Rule.required().max(2).warning("You must upload 2 images."),
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Brief Services Description",
    }),
  },
});
