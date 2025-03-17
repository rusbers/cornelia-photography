import { defineField, type ImageRule } from "sanity";

export const createImageField = ({
  name = "image",
  title = "Image",
  description = "Upload an image",
  includeAltText = true,
  validation,
}: {
  name?: string;
  title?: string;
  description?: string;
  validation?: (rule: ImageRule) => ImageRule; // Corrected Type
  includeAltText?: boolean;
} = {}) => {
  return defineField({
    name,
    title,
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
    description,
    validation,
  });
};
