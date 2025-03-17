import { type PagebuilderType } from "@/types";
import { RichText } from "../richtext";
import { SanityImage } from "../sanity-image";
import { SanityButton } from "../sanity-buttons";
import { cn } from "@workspace/ui/lib/utils";

type MySpecialitiesProps = PagebuilderType<"mySpecialities">;

export function MySpecialities({
  pretitle,
  heading,
  richText,
  button,
  images,
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
        <div
          className={cn(
            "grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-[28%_1fr_28%] lg:items-center xl:grid-cols-3",
            !images && "flex lg:flex justify-center mx-auto",
          )}
        >
          <div
            className={
              "p-4 bg-background-secondary max-lg:col-span-full lg:h-full"
            }
          >
            <div className="border-4 px-7 py-16 flex flex-col gap-6 h-full">
              <RichText
                className={cn(
                  "prose-ol:text-lg prose-p:text-lg prose-h3:text-xl text-center prose-li:list-inside prose-ol:pl-0 prose-li:pl-0",
                  !images && "max-w-[40ch]",
                )}
                richText={richText}
              />
              <div className="flex justify-center mt-auto">
                <SanityButton {...button} />
              </div>
            </div>
          </div>
          {images?.map((image) => (
            <SanityImage
              width={671}
              height={1007}
              className="first-of-type:order-first first-of-type:md:order-none first-of-type:lg:order-first"
              key={image._key}
              asset={image}
              alt={image.imageDescription || undefined}
              sizes="(max-width: 768px) 80vw, (max-width: 1024px) 48vw, 33vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
