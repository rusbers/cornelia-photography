import type { PagebuilderType } from "@/types";
import { RichText } from "../richtext";
import { SanityButton } from "../sanity-buttons";
import { SanityImage } from "../sanity-image";
import { Currency } from "@/lib/sanity/sanity.types";

type PricesBlockProps = PagebuilderType<"prices">;

export function PricesBlock({
  pretitle,
  heading,
  currency,
  pricingTiers,
  button,
}: PricesBlockProps) {
  return (
    <section id="prices" className="section pt-0">
      <div className="container">
        <div className="py-16">
          <p className="pretitle text-center mb-4">{pretitle}</p>
          <RichText
            className="text-center prose-h1:mb-2 prose-p:first-of-type:mt-0"
            richText={heading}
          />
        </div>
        <div className="grid gap-6 justify-center xl:grid-cols-3">
          {pricingTiers?.map((pricing) => (
            <div
              key={pricing._id}
              className="p-4 bg-background-secondary max-w-[37.5rem] flex"
            >
              <div className="border-4 p-4 pb-16 flex flex-col gap-12">
                <div className=";g:p-4 xl:p-0">
                  <SanityImage
                    width={604}
                    height={427}
                    className="shadow-xl"
                    loading="eager"
                    asset={pricing.image}
                  />
                </div>

                <div className="text-center">
                  <p className="text-4xl font-serif text-foreground-heading mb-4">
                    {pricing.price && formatPrice(pricing.price, currency)}
                  </p>
                  <p className="text-uppercase text-xl">{pricing.category}</p>
                </div>
                <RichText
                  className="prose-p:text-xl prose-p:text-foreground-heading prose-ul:text-lg prose-ul:text-foreground prose-ul:max-w-fit prose-ul:mx-auto marker:text-primary text-center prose-li:text-start prose-ul:pl-7 prose-p:max-w-[30ch] prose-p:mx-auto"
                  richText={pricing.content}
                />
                <div className="flex justify-center mt-auto">
                  <SanityButton {...button} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const formatPrice = (price: number, currency?: Currency | null) => {
  const currenciesAfterPrice = new Set(["RON", "MDL"]);
  const noSpaceCurrencies = new Set(["EUR", "USD"]);
  const currencySymbols: Record<string, string> = {
    EUR: "€",
    USD: "$",
    RON: "RON",
    MDL: "MDL",
  };

  const currencyType = currency?.currencyType || "custom";
  const customCurrency = currency?.customCurrency || "???";
  const symbol =
    currencyType === "custom"
      ? customCurrency
      : currencySymbols[currencyType] || currencyType;

  if (currenciesAfterPrice.has(currencyType)) {
    return `${price} ${symbol}`;
  }
  return noSpaceCurrencies.has(currencyType)
    ? `${symbol}${price}`
    : `${symbol} ${price}`;
};
