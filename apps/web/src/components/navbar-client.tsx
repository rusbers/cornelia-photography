"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import { buttonVariants } from "@workspace/ui/components/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@workspace/ui/components/navigation-menu";
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet";
import { Sheet, SheetTrigger } from "@workspace/ui/components/sheet";
import { cn } from "@workspace/ui/lib/utils";
import { Menu, X } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { stegaClean } from "next-sanity";
import { useEffect, useState } from "react";

import { useIsMobile } from "@/hooks/use-is-mobile";
import type { QueryNavbarDataResult } from "@/lib/sanity/sanity.types";

import { Logo } from "./logo";
import { SanityButtons } from "./sanity-buttons";
import { SanityIcon } from "./sanity-icon";

interface MenuItem {
  title: string;
  description: string;
  icon: JSX.Element;
  href?: string;
}

function MenuItemLink({
  item,
  setIsOpen,
}: {
  item: MenuItem;
  setIsOpen?: (isOpen: boolean) => void;
}) {
  return (
    <Link
      className={cn(
        "flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground items-center focus:bg-accent focus:text-accent-foreground",
      )}
      aria-label={`Link to ${item.title ?? item.href}`}
      onClick={() => setIsOpen?.(false)}
      href={item.href ?? "/"}
    >
      {item.icon}
      <div className="">
        <div className="text-sm font-semibold">{item.title}</div>
        <p className="text-sm leading-snug text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      </div>
    </Link>
  );
}

function MobileNavbarAccordionColumn({
  column,
  setIsOpen,
}: {
  column: NonNullable<NonNullable<QueryNavbarDataResult>["columns"]>[number];
  setIsOpen: (isOpen: boolean) => void;
}) {
  if (column.type !== "column") return null;
  return (
    <AccordionItem value={column.title ?? column._key} className="border-b-0">
      <AccordionTrigger className="mb-4 py-0 font-semibold hover:no-underline hover:bg-accent hover:text-accent-foreground pr-2 rounded-md">
        <div
          className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
        >
          {column.title}
        </div>
      </AccordionTrigger>
      <AccordionContent className="mt-2">
        {column.links?.map((item) => (
          <MenuItemLink
            key={item._key}
            setIsOpen={setIsOpen}
            item={{
              description: item.description ?? "",
              href: item.href ?? "",
              icon: <SanityIcon icon={item.icon} className="size-5 shrink-0" />,
              title: item.name ?? "",
            }}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

function MobileNavbar({ navbarData }: { navbarData: QueryNavbarDataResult }) {
  const { logo, siteTitle, columns, buttons } = navbarData ?? {};
  const [isOpen, setIsOpen] = useState(true);

  const path = usePathname();

  const MobileLogo = () => <Logo src={logo} alt={siteTitle} />;

  // biome-ignore lint/correctness/useExhaustiveDependencies: This is intentional
  useEffect(() => {
    setIsOpen(false);
  }, [path]);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="grid grid-cols-[auto,_1fr] gap-4 items-center">
        <MobileLogo />
        <SheetTrigger className="justify-self-end" asChild>
          <button className="" type="button">
            <Menu className="size-10" />
            <span className="sr-only">Open menu</span>
          </button>
        </SheetTrigger>
      </div>
      <SheetContent className="overflow-y-auto space-y-6 bg-background-secondary max-[599px]:w-full">
        <SheetHeader className="flex gap-4 flex-row space-y-0 items-center justify-between">
          <SheetTitle>
            <MobileLogo />
          </SheetTitle>
          <SheetClose asChild>
            <button className="" type="button">
              <X className="size-10" />
              <span className="sr-only">Close menu</span>
            </button>
          </SheetClose>
        </SheetHeader>

        <div className="flex flex-col gap-4">
          {columns?.map((column) => {
            if (column.type === "link") {
              return (
                <Link
                  key={`column-link-${column.name}-${column._key}`}
                  href={column.href ?? ""}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "hover:text-accent-foreground text-sm font-medium tracking-[.0875rem] uppercase transition-all duration-200 py-4 px-4 hover:bg-transparent text-center",
                    path === column.href && "text-accent-foreground",
                  )}
                >
                  {column.name}
                </Link>
              );
            }
            return (
              <Accordion
                type="single"
                collapsible
                className="w-full"
                key={column._key}
              >
                <MobileNavbarAccordionColumn
                  column={column}
                  setIsOpen={setIsOpen}
                />
              </Accordion>
            );
          })}
        </div>

        <div className="border-t pt-4">
          <SanityButtons
            buttons={buttons ?? []}
            buttonClassName="w-full"
            className="flex mt-2 flex-col gap-3"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function NavbarColumnLink({
  column,
}: {
  column: NonNullable<NonNullable<QueryNavbarDataResult>["columns"]>[number];
}) {
  const pathname = usePathname();

  if (column.type !== "link") return null;
  return (
    <Link
      className={cn(
        "hover:text-accent-foreground text-sm font-medium tracking-[.0875rem] uppercase transition-all duration-200 py-4 px-4 hover:bg-transparent",
        pathname === column.href && "text-accent-foreground",
      )}
      aria-label={`Link to ${stegaClean(column.name) ?? stegaClean(column.href)}`}
      href={column.href ?? ""}
    >
      {stegaClean(column.name)}
    </Link>
  );
}

function NavbarColumn({
  column,
}: {
  column: NonNullable<NonNullable<QueryNavbarDataResult>["columns"]>[number];
}) {
  if (column.type !== "column") return null;
  return (
    <NavigationMenuList>
      <NavigationMenuItem className="text-muted-foreground">
        <NavigationMenuTrigger>{column.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3">
            {column.links?.map((item) => (
              <li key={item._key}>
                <MenuItemLink
                  item={{
                    description: item.description ?? "",
                    href: item.href ?? "",
                    icon: (
                      <SanityIcon
                        icon={item.icon}
                        className="size-5 shrink-0"
                      />
                    ),
                    title: item.name ?? "",
                  }}
                />
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}

export function DesktopNavbar({
  navbarData,
}: {
  navbarData: QueryNavbarDataResult;
}) {
  // TODO Sanity buttons
  const { columns, buttons, logo, siteTitle } = navbarData ?? {};
  // TODO return a basic layout instead of null if no columns
  if (!columns) return null;

  const isSimpleLayout = columns?.length % 2 !== 0 || columns?.length <= 5;

  const DesktopLogo = () => (
    <Logo
      className="lg:h-[88px] lg:w-[188px] shrink-0"
      src={logo}
      alt={siteTitle}
    />
  );

  return isSimpleLayout ? (
    <div className="grid grid-cols-[auto,_1fr] gap-4 items-center">
      <DesktopLogo />
      <NavigationMenu className="justify-self-end">
        {columns?.map((column) =>
          column.type === "column" ? (
            <NavbarColumn key={`nav-${column._key}`} column={column} />
          ) : (
            <NavbarColumnLink key={`nav-${column._key}`} column={column} />
          ),
        )}
      </NavigationMenu>
    </div>
  ) : (
    <div className="grid grid-cols-[1fr,_auto,_1fr] items-center">
      <div className="flex flew-wrap gap-4 justify-self-start">
        {columns
          .slice(0, Math.ceil(columns.length / 2))
          .map((column) =>
            column.type === "column" ? (
              <NavbarColumn key={`nav-${column._key}`} column={column} />
            ) : (
              <NavbarColumnLink key={`nav-${column._key}`} column={column} />
            ),
          )}
      </div>
      <DesktopLogo />
      <div className="flex flew-wrap gap-4 justify-self-end">
        {columns
          .slice(Math.ceil(columns.length / 2))
          .map((column) =>
            column.type === "column" ? (
              <NavbarColumn key={`nav-${column._key}`} column={column} />
            ) : (
              <NavbarColumnLink key={`nav-${column._key}`} column={column} />
            ),
          )}
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <NavigationMenu>
  //       {columns?.map((column) =>
  //         column.type === "column" ? (
  //           <NavbarColumn key={`nav-${column._key}`} column={column} />
  //         ) : (
  //           <NavbarColumnLink key={`nav-${column._key}`} column={column} />
  //         ),
  //       )}
  //     </NavigationMenu>
  //     {/* TODO Sanity buttons Either remove the buttons option from navbar, or decide where to place them, or to add option in CMS to add buttons, then change layout style */}
  //     {/* <div className="justify-self-end">
  //       <SanityButtons
  //         buttons={buttons ?? []}
  //         className="flex items-center gap-4"
  //         buttonClassName="rounded-[10px]"
  //       />
  //     </div> */}
  //   </div>
  // );
}

const ClientSideNavbar = ({
  navbarData,
}: {
  navbarData: QueryNavbarDataResult;
}) => {
  const isMobile = useIsMobile(1023);

  if (isMobile === undefined) {
    return null; // Return null on initial render to avoid hydration mismatch
  }

  return isMobile ? (
    <MobileNavbar navbarData={navbarData} />
  ) : (
    <DesktopNavbar navbarData={navbarData} />
  );
};

function SkeletonMobileNavbar() {
  return (
    <div className="grid grid-cols-[auto,_1fr] gap-4 items-center lg:hidden">
      <div className="w-[10.3125rem] h-[4.8125rem] bg-muted animate-pulse rounded-md" />
      <div className="justify-self-end rounded-md bg-muted animate-pulse size-10" />
    </div>
  );
}

function SkeletonDesktopNavbar() {
  return (
    <div className="hidden lg:grid grid-cols-[auto,_1fr] gap-4 items-center">
      <div className="h-[5.5rem] w-[11.75rem] bg-muted animate-pulse rounded-md" />

      <div className="justify-self-end">
        <div className="flex items-center gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`nav-button-skeleton-${index.toString()}`}
              className="h-12 w-32 rounded-[10px] bg-muted animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function NavbarSkeletonResponsive() {
  return (
    <>
      <SkeletonMobileNavbar />
      <SkeletonDesktopNavbar />
    </>
  );
}

// Dynamically import the navbar with no SSR to avoid hydration issues
export const NavbarClient = dynamic(() => Promise.resolve(ClientSideNavbar), {
  ssr: false,
  loading: () => <NavbarSkeletonResponsive />,
});
