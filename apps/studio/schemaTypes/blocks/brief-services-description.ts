import { defineType } from "sanity";
import { BriefcaseBusiness } from "lucide-react";
import { extensibleRichText } from "../definitions/rich-text";
import { createImagesField } from "../definitions/images";

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
    createImagesField({
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
