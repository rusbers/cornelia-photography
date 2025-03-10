import { defineField, defineType } from "sanity";

import { createRadioListLayout, isValidUrl } from "../../utils/helper";

const allLinkableTypes = [{ type: "portfolioIndex" }, { type: "portfolio" }];

export const portfolioUrl = defineType({
  name: "portfolioUrl",
  type: "object",
  fields: [
    defineField({
      name: "link",
      type: "reference",
      options: { disableNew: true },
      to: allLinkableTypes,
      validation: (rule) => [
        rule.custom((value, { parent }) => {
          const type = (parent as { type?: string })?.type;
          if (type === "link" && !value?._ref) return "Link can't be empty";
          return true;
        }),
      ],
    }),
  ],
});
