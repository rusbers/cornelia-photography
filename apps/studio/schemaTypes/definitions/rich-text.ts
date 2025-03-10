import { ImageIcon, LinkIcon } from "@sanity/icons";
import { AArrowDown, AArrowUp } from "lucide-react";
import {
  BlockRule,
  defineArrayMember,
  defineField,
  defineType,
  Rule,
  ValidationBuilder,
} from "sanity";
import {
  SmallTextDecorator,
  SmallTextIcon,
  UppercaseTextDecorator,
  UppercaseTextIcon,
} from "../../components/rich-text-components";

const richTextMembers = [
  defineArrayMember({
    name: "block",
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      { title: "H1", value: "h1" },
      { title: "H2", value: "h2" },
      { title: "H3", value: "h3" },
      { title: "H4", value: "h4" },
      { title: "H5", value: "h5" },
      { title: "H6", value: "h6" },
      { title: "Inline", value: "inline" },
    ],
    lists: [
      { title: "Numbered", value: "number" },
      { title: "Bullet", value: "bullet" },
    ],
    marks: {
      annotations: [
        {
          name: "customLink",
          type: "object",
          title: "Internal/External Link",
          icon: LinkIcon,
          fields: [
            defineField({
              name: "customLink",
              type: "customUrl",
            }),
          ],
        },
      ],
      decorators: [
        { title: "Strong", value: "strong" },
        { title: "Emphasis", value: "em" },
        { title: "Code", value: "code" },
        {
          title: "Small",
          value: "small",
          icon: SmallTextIcon,
          component: SmallTextDecorator,
        },
        {
          title: "Uppercase",
          value: "uppercase",
          icon: UppercaseTextIcon,
          component: UppercaseTextDecorator,
        },
      ],
    },
  }),
  defineArrayMember({
    name: "image",
    title: "Image",
    type: "image",
    icon: ImageIcon,
    options: {
      hotspot: true,
    },
    fields: [
      defineField({
        name: "caption",
        type: "string",
        title: "Caption Text",
      }),
    ],
  }),
];

export const richText = defineType({
  name: "richText",
  type: "array",
  of: richTextMembers,
});

export const memberTypes = richTextMembers.map((member) => member.name);

type Type = NonNullable<(typeof memberTypes)[number]>;

export const customRichText = (
  type: Type[],
  options?: { name?: string; title?: string; group?: string },
) => {
  const { name } = options ?? {};
  const customMembers = richTextMembers.filter(
    (member) => member.name && type.includes(member.name),
  );
  return defineField({
    ...options,
    name: name ?? "richText",
    type: "array",
    of: customMembers,
  });
};

type StyleOptions = (
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "normal"
  | "inline"
  | "blockquote"
)[];

type ListOptions = ("bullet" | "number")[];

type DecoratorOptions = ("strong" | "em" | "small" | "uppercase")[];

type InclusionType = {
  styles?: StyleOptions;
  lists?: ListOptions;
  decorators?: DecoratorOptions;
};

export const extensibleRichText = (
  type: Type[],
  options?: {
    name?: string;
    title?: string;
    description?: string;
    group?: string;
  },
  inclusions?: InclusionType,
) => {
  const { name } = options ?? {};

  // Get allowed styles, lists, and decorators based on the inclusions
  const customMembers = richTextMembers
    .filter((member) => member.name && type.includes(member.name))
    .map((member) => {
      if (member.name === "block") {
        return {
          ...member,
          styles: inclusions?.styles
            ? (member.styles?.filter((style) =>
                inclusions.styles!.includes(
                  style.value as StyleOptions[number],
                ),
              ) ?? [])
            : member.styles,
          lists: inclusions?.lists
            ? (member.lists?.filter((list) =>
                inclusions.lists!.includes(list.value as ListOptions[number]),
              ) ?? [])
            : member.lists,
          marks: {
            annotations: [...(member.marks?.annotations ?? [])], // Ensures customLink is always present
            decorators: inclusions?.decorators
              ? (member.marks?.decorators?.filter((decorator) =>
                  inclusions.decorators!.includes(
                    decorator.value as DecoratorOptions[number],
                  ),
                ) ?? [])
              : member.marks?.decorators,
          },
        };
      }

      return member;
    });

  return defineField({
    ...options,
    name: name ?? "richText",
    type: "array",
    of: customMembers,
  });
};
