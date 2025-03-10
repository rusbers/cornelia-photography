"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";

export const PreviewBar: FC = () => {
  const path = usePathname();
  return (
    <div className="fixed bottom-2 left-0 right-0 z-10 px-2 md:bottom-4 md:px-4 ">
      <div className="mx-auto max-w-2xl rounded-md border-2 border-black border-opacity-5 bg-[#cfb7b7] p-4 opacity-30 hover:opacity-100 transition-all duration-200">
        <div className="flex ">
          <div />
          <div className="ml-3 flex-1 md:flex md:justify-between text-foreground-heading">
            <p className="text-base">
              You are currently viewing the website in preview mode.
            </p>

            <Link
              className="mt-3 text-base  text-opacity-80 md:ml-6 md:mt-0 hover:underline underline-offset-4 active:opacity-50 transition-all duration-200"
              href={`/api/disable-draft?slug=${path}`}
              prefetch={false}
            >
              Click here to exit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
