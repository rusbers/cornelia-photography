import { type ArrayRule, defineArrayMember, defineField } from "sanity";

export const createImagesField = ({
  name = "images",
  title = "Images",
  description = "Upload several images",
  includeAltText = true,
  validation,
}: {
  name?: string;
  title?: string;
  description?: string;
  validation?: (rule: ArrayRule<unknown[]>) => ArrayRule<unknown[]>;
  includeAltText?: boolean;
} = {}) => {
  return defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "image",
        fields: includeAltText
          ? [
              defineField({
                name: "imageDescription",
                title: "Alternative Text",
                type: "string",
                description: "Describe the image for accessibility and SEO.",
              }),
            ]
          : [],
        options: {
          hotspot: true,
          ...(includeAltText && {
            aiAssist: {
              imageDescriptionField: "imageDescription",
            },
          }),
        },
      }),
    ],
    options: { layout: "grid" },
    description,
    validation,
  });
};
