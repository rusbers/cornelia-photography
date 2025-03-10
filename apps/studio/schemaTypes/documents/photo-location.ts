import { defineField, defineType } from "sanity";
import { MapPin, Plane } from "lucide-react";

export const photoLocation = defineType({
  name: "photoLocation",
  title: "Photo Location",
  icon: Plane,
  type: "document",
  fields: [
    defineField({
      name: "country",
      type: "string",
    }),
    defineField({
      name: "region",
      title: "City or region",
      type: "string",
    }),
  ],
  preview: {
    select: {
      country: "country",
      region: "region",
      media: "flag",
    },
    prepare: ({ country, region, media }) => ({
      title: country,
      subtitle: region,
      media: media || MapPin,
    }),
  },
});
