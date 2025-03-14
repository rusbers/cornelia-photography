import { sanityFetch } from "@/lib/sanity/live";
import { queryNavbarData } from "@/lib/sanity/query";
import type { QueryNavbarDataResult } from "@/lib/sanity/sanity.types";
import { NavbarClient, NavbarSkeletonResponsive } from "./navbar-client";
import { NavigationMenu } from "@workspace/ui/components/navigation-menu";

const NAVBAR_STYLES =
  "page-header fixed top-0 inset-x-0 z-50 w-full border-b bg-white/80 py-6 backdrop-blur-2xl h-[126px] lg:h-[137px]";

export async function NavbarServer() {
  const navbarData = await sanityFetch({ query: queryNavbarData });

  return <Navbar navbarData={navbarData.data} />;
}

export function Navbar({ navbarData }: { navbarData: QueryNavbarDataResult }) {
  return (
    <header className={NAVBAR_STYLES}>
      <NavigationMenu className="container">
        <NavbarClient navbarData={navbarData} />
      </NavigationMenu>
    </header>
  );
}
// TODO-STYLES: Navbar Skeleton
export function NavbarSkeleton() {
  return (
    <header className={NAVBAR_STYLES}>
      <div className="container">
        <NavbarSkeletonResponsive />
      </div>
    </header>
  );
}
