import { defineField, defineType } from "sanity";
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
    defineField({
      name: "horizontalImage",
      description: "Should be an horizontal image",
      title: "Main Image",
      type: "image",
    }),
    extensibleRichText(
      ["block"],
      { name: "secondText", title: "Secondary text" },
      { styles: ["normal"], lists: [], decorators: ["strong", "em", "small"] },
    ),
    defineField({
      name: "verticalImage",
      description: "Should be a vertical image",
      title: "Secondary Image",
      type: "image",
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Brief Services Description",
    }),
  },
});
