import { sanityFetch } from "@/lib/sanity/live";
import { queryNavbarData } from "@/lib/sanity/query";
import type { QueryNavbarDataResult } from "@/lib/sanity/sanity.types";
import { NavbarClient, NavbarSkeletonResponsive } from "./navbar-client";
import { NavigationMenu } from "@workspace/ui/components/navigation-menu";

const navbarStyles = {
  header:
    "sticky top-0 left-0 z-50 w-full border-b bg-white/80 py-6 backdrop-blur-2xl",
};

export async function NavbarServer() {
  const navbarData = await sanityFetch({ query: queryNavbarData });

  return <Navbar navbarData={navbarData.data} />;
}

export function Navbar({ navbarData }: { navbarData: QueryNavbarDataResult }) {
  return (
    <header className={navbarStyles.header}>
      <NavigationMenu className="container">
        <NavbarClient navbarData={navbarData} />
      </NavigationMenu>
    </header>
  );
}
// TODO-STYLES: Navbar Skeleton
export function NavbarSkeleton() {
  return (
    <header className={navbarStyles.header}>
      <div className="container">
        <nav className="grid grid-cols-[auto_1fr] items-center gap-4">
          <div className="h-[40px] w-[170px] rounded animate-pulse bg-muted" />
          <NavbarSkeletonResponsive />
        </nav>
      </div>
    </header>
  );
}
