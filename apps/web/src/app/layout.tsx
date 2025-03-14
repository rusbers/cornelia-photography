import "@workspace/ui/globals.css";

import { revalidatePath, revalidateTag } from "next/cache";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { Suspense } from "react";
import { preconnect, prefetchDNS } from "react-dom";

import { FooterServer, FooterSkeleton } from "@/components/footer";
import { NavbarServer, NavbarSkeleton } from "@/components/navbar";
import { PreviewBar } from "@/components/preview-bar";
import { SanityLive } from "@/lib/sanity/live";
import AOS from "@/components/AOS";
import { Loading } from "@/components/loading";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
});
const zodiak = localFont({
  src: "./fonts/Zodiak-Variable.woff2",
  variable: "--font-zodiak",
});
const zodiakItalic = localFont({
  src: "./fonts/Zodiak-VariableItalic.woff2",
  variable: "--font-zodiak-italic",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preconnect("https://cdn.sanity.io");
  prefetchDNS("https://cdn.sanity.io");
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${satoshi.variable} ${zodiak.variable} ${zodiakItalic.variable} font-sans text-xl antialiased`}
      >
        <Suspense fallback={<NavbarSkeleton />}>
          <NavbarServer />
        </Suspense>
        {(await draftMode()).isEnabled ? (
          <>
            {<Suspense fallback={<Loading />}>{children}</Suspense>}
            <VisualEditing
              refresh={async (payload) => {
                "use server";
                if (payload.source === "manual") {
                  revalidatePath("/", "layout");
                  return;
                }
                const id = payload?.document?._id?.startsWith("drafts.")
                  ? payload?.document?._id.slice(7)
                  : payload?.document?._id;
                const slug = payload?.document?.slug?.current;
                const type = payload?.document?._type;
                for (const tag of [slug, id, type]) {
                  if (tag) revalidateTag(tag);
                }
              }}
            />
            <PreviewBar />
          </>
        ) : (
          <Suspense fallback={<Loading />}>{children}</Suspense>
        )}
        <Suspense fallback={<FooterSkeleton />}>
          <FooterServer />
        </Suspense>
        <SanityLive />
      </body>
      <AOS />
    </html>
  );
}
