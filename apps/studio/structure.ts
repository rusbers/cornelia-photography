import {
  BookMarked,
  CogIcon,
  Euro,
  File,
  Files,
  FileText,
  Globe,
  HomeIcon,
  Images,
  Link,
  type LucideIcon,
  Map,
  MessageCircleQuestion,
  MessageSquareQuote,
  PanelBottomIcon,
  PanelTopDashedIcon,
  Settings2,
  User,
} from "lucide-react";
import type {
  StructureBuilder,
  StructureResolverContext,
} from "sanity/structure";

import type { SchemaType, SingletonType } from "./schemaTypes";
import { getTitleCase } from "./utils/helper";

type Base<T = SchemaType> = {
  id?: string;
  type: T;
  preview?: boolean;
  title?: string;
  icon?: LucideIcon;
};

type CreateSingleTon = {
  S: StructureBuilder;
} & Base<SingletonType>;

const createSingleTon = ({ S, type, title, icon }: CreateSingleTon) => {
  const newTitle = title ?? getTitleCase(type);
  return S.listItem()
    .title(newTitle)
    .icon(icon ?? File)
    .child(S.document().schemaType(type).documentId(type));
};

type CreateList = {
  S: StructureBuilder;
} & Base;

// This function creates a list item for a type. It takes a StructureBuilder instance (S),
// a type, an icon, and a title as parameters. It generates a title for the type if not provided,
// and uses a default icon if not provided. It then returns a list item with the generated or
// provided title and icon.

const createList = ({ S, type, icon, title, id }: CreateList) => {
  const newTitle = title ?? getTitleCase(type);
  return S.documentTypeListItem(type)
    .id(id ?? type)
    .title(newTitle)
    .icon(icon ?? File);
};

type CreateIndexList = {
  S: StructureBuilder;
  list: Base;
  index: Base<SingletonType>;
  navigation?: Base;
};

const createIndexList = ({ S, index, list, navigation }: CreateIndexList) => {
  const indexTitle = index.title ?? getTitleCase(index.type);
  const listTitle = list.title ?? getTitleCase(list.type);

  const items = [
    S.listItem()
      .title(indexTitle)
      .icon(index.icon ?? File)
      .child(
        S.document()
          .views([S.view.form()])
          .schemaType(index.type)
          .documentId(index.type),
      ),
    S.documentTypeListItem(list.type)
      .title(`${listTitle}`)
      .icon(list.icon ?? File),
  ];

  // Add navigation if provided
  if (navigation) {
    const navigationTitle = navigation.title ?? getTitleCase(navigation.type);
    items.push(
      S.listItem()
        .title(navigationTitle)
        .icon(navigation.icon ?? File)
        .child(
          S.document().schemaType(navigation.type).documentId(navigation.type),
        ),
    );
  }

  return S.listItem()
    .title(listTitle)
    .icon(index.icon ?? File)
    .child(S.list().title(indexTitle).items(items));
};

export const structure = (
  S: StructureBuilder,
  context: StructureResolverContext,
) => {
  return S.list()
    .title("Content")
    .items([
      createSingleTon({ S, type: "homePage", icon: HomeIcon }),
      S.divider(),
      createList({ S, type: "page", title: "Pages", icon: Files }),
      createIndexList({
        S,
        index: { type: "portfolioIndex", icon: Images },
        list: { type: "portfolio", title: "Portfolio" },
        navigation: {
          type: "portfolioNavigation",
          title: "Navigation",
          icon: Map,
        },
      }),
      createIndexList({
        S,
        index: { type: "blogIndex", icon: BookMarked },
        list: { type: "blog", title: "Blog", icon: FileText },
      }),
      S.divider(),
      createList({
        S,
        type: "pricing",
        title: "Pricing Tiers",
        icon: Euro,
      }),
      createList({
        S,
        type: "testimonial",
        title: "Testimonials",
        icon: MessageSquareQuote,
      }),
      createList({
        S,
        type: "photoLocation",
        title: "Shooting Locations",
        icon: Globe,
      }),
      S.divider(),
      S.listItem()
        .title("Site Configuration")
        .icon(Settings2)
        .child(
          S.list()
            .title("Site Configuration")
            .items([
              createSingleTon({
                S,
                type: "navbar",
                title: "Navigation",
                icon: PanelTopDashedIcon,
              }),
              createSingleTon({
                S,
                type: "footer",
                title: "Footer",
                icon: PanelBottomIcon,
              }),
              createSingleTon({
                S,
                type: "settings",
                title: "Global Settings",
                icon: CogIcon,
              }),
            ]),
        ),
    ]);
};
