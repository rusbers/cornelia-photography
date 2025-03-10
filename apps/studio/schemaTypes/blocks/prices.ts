import { Euro } from "lucide-react";
import { defineField, defineType } from "sanity";
import { extensibleRichText } from "../definitions/rich-text";

export const prices = defineType({
  name: "prices",
  title: "Prices",
  icon: Euro,
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
        title: "Heading and subheading",
        description:
          "Use an H1 heading if this is the first section of the page.",
      },
      { styles: ["h1", "h2", "h3"], decorators: ["strong", "em"] },
    ),
    defineField({
      name: "currency",
      type: "currency",
      description: "Prices currency applied",
      initialValue: {
        currencyType: "EUR", // Set initial currency type to EUR
      },
    }),
    defineField({
      name: "pricingTiers",
      title: "Pricing Tiers",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "pricing" }],
          options: { disableNew: true },
        },
      ],
      validation: (Rule) => [Rule.required(), Rule.unique()],
    }),
    defineField({ name: "button", type: "button" }),
  ],
});
