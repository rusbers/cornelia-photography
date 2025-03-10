import { defineField, defineType } from "sanity";

export const currency = defineType({
  name: "currency",
  title: "Currency",
  type: "object",
  fields: [
    defineField({
      name: "currencyType",
      title: "Currency Type",
      type: "string",
      options: {
        list: [
          { title: "Euro (EUR)", value: "EUR" },
          { title: "US Dollar (USD)", value: "USD" },
          { title: "Romanian Leu (RON)", value: "RON" },
          { title: "Moldovian Leu (MDL)", value: "MDL" },
          { title: "Custom", value: "custom" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "customCurrency",
      title: "Custom Currency Code",
      type: "string",
      hidden: ({ parent }: { parent?: { currencyType?: string } }) =>
        parent?.currencyType !== "custom",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { currencyType?: string };
          if (parent?.currencyType === "custom" && !value) {
            return "Custom currency code is required when 'Custom' is selected";
          }
          if (value && !/^[A-Z]{3}$/.test(value as string)) {
            return "Currency code must be a 3-letter uppercase abbreviation (e.g., GBP, JPY)";
          }
          return true;
        }),
    }),
  ],
});
