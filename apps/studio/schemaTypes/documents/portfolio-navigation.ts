import { Link, PanelTop } from "lucide-react";
import { defineField, defineType } from "sanity";
import { buttonsField } from "../common";

const portfolioNavigationLink = defineField({
  name: "portfolioNavigationLink",
  type: "object",
  icon: Link,
  title: "Navigation Link",
  description: "Portfolio navigation link with name and URL",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Link Text",
      description: "The text that will be displayed for this navigation link",
    }),
    defineField({
      name: "url",
      type: "portfolioUrl",
      title: "Link URL",
      description: "The URL that this link will navigate to when clicked",
    }),
  ],
  // preview: {
  //   select: {
  //     title: "name",
  //     externalUrl: "url.external",
  //     urlType: "url.type",
  //     internalUrl: "url.internal.slug.current",
  //     openInNewTab: "url.openInNewTab",
  //   },
  //   prepare({ title, externalUrl, urlType, internalUrl, openInNewTab }) {
  //     const url = urlType === "external" ? externalUrl : internalUrl;
  //     const newTabIndicator = openInNewTab ? " ↗" : "";
  //     const truncatedUrl =
  //       url?.length > 30 ? `${url.substring(0, 30)}...` : url;

  //     return {
  //       title: title || "Untitled Link",
  //       subtitle: `${urlType === "external" ? "External" : "Internal"} • ${truncatedUrl}${newTabIndicator}`,
  //       media: Link,
  //     };
  //   },
  // },
});

export const portfolioNavigation = defineType({
  name: "portfolioNavigation",
  title: "Portfolio Navigation",
  type: "document",
  icon: PanelTop,
  description: "Configure the navigation structure for your portfolio",
  fields: [
    defineField({
      name: "label",
      type: "string",
      initialValue: "Portfolio Navigation",
      title: "Navigation Label",
      description:
        "Internal label to identify this navigation configuration in the CMS",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "links",
      type: "array",
      title: "Navigation Structure",
      description: "Build your navigation menu using links.",
      of: [portfolioNavigationLink],
    }),
    // buttonsField,
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare: ({ title }) => ({
      title: title || "Untitled Navigation",
    }),
  },
});
