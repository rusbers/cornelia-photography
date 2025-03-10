import { type PagebuilderType } from "@/types";
import { RichText } from "../richtext";
import Link from "next/link";
import { SanityImage } from "../sanity-image";
import { SanityButton } from "../sanity-buttons";

type MySpecialitiesProps = PagebuilderType<"mySpecialities">;

export function MySpecialities({
  pretitle,
  heading,
  richText,
  button,
  photos,
}: MySpecialitiesProps) {
  return (
    <section id="mySpecialities" className="section">
      <div className="container">
        <div className="mb-12">
          <p className="pretitle mb-4 text-center">{pretitle}</p>
          <RichText
            className="max-w-[75ch] mx-auto text-center"
            richText={heading}
          />
        </div>
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-[28%_1fr_28%] lg:items-center xl:grid-cols-3">
          <div className="p-4 bg-background-secondary max-lg:col-span-full lg:h-full">
            <div className="border-4 px-7 py-16 flex flex-col gap-6 h-full">
              <RichText
                className="prose-ol:text-lg prose-p:text-lg prose-h3:text-xl text-center prose-li:list-inside prose-ol:pl-0 prose-li:pl-0"
                richText={richText}
              />
              <div className="flex justify-center mt-auto">
                <SanityButton {...button} />
              </div>
            </div>
          </div>
          {photos?.map((photo) => (
            <SanityImage
              width={828}
              height={1242}
              className="first-of-type:order-first first-of-type:md:order-none first-of-type:lg:order-first"
              key={photo._key}
              asset={photo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
