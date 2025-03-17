import { defineQuery } from "next-sanity";

// Base fragments for reusable query parts
const imageFragment = /* groq */ `
  image{
    ...,
    "alt": coalesce(asset->altText, asset->originalFilename, "Image-Broken"),
    "blurData": asset->metadata.lqip,
    "dominantColor": asset->metadata.palette.dominant.background,
  }
`;

const imagesFragment = /* groq */ `
  images[]{
    ...,
    imageDescription,
    "alt": coalesce(asset->altText, asset->originalFilename, "Image-Broken"),
    "blurData": asset->metadata.lqip,
    "dominantColor": asset->metadata.palette.dominant.background,
  }
`;

const customLinkFragment = /* groq */ `
  ...customLink{
    openInNewTab,
    "href": select(
      type == "internal" => internal->slug.current,
      type == "external" => external,
      "#"
    ),
  }
`;

const markDefsFragment = /* groq */ `
  markDefs[]{
    ...,
    ${customLinkFragment}
  }
`;

const richTextFragment = /* groq */ `
  richText[]{
    ...,
    ${markDefsFragment}
  }
`;

const blogAuthorFragment = /* groq */ `
  authors[0]->{
    _id,
    name,
    position,
    ${imageFragment}
  }
`;

const blogCardFragment = /* groq */ `
  _type,
  _id,
  title,
  description,
  "slug":slug.current,
  richText,
  ${imageFragment},
  publishedAt,
  ${blogAuthorFragment}
`;

const buttonFragment = /* groq */ `
  button{
    text,
    variant,
    _key,
    _type,
    "openInNewTab": url.openInNewTab,
    "href": select(
      url.type == "internal" => url.internal->slug.current,
      url.type == "external" => url.external,
      url.href
    ),
  }
`;

const buttonsFragment = /* groq */ `
  buttons[]{
    text,
    variant,
    _key,
    _type,
    "openInNewTab": url.openInNewTab,
    "href": select(
      url.type == "internal" => url.internal->slug.current,
      url.type == "external" => url.external,
      url.href
    ),
  }
`;

// Page builder block fragments
const ctaBlock = /* groq */ `
  _type == "cta" => {
    ...,
    ${richTextFragment},
    ${buttonsFragment},
  }
`;
const imageLinkCardsBlock = /* groq */ `
  _type == "imageLinkCards" => {
    ...,
    ${richTextFragment},
    ${buttonsFragment},
    "cards": array::compact(cards[]{
      ...,
      "openInNewTab": url.openInNewTab,
      "href": select(
        url.type == "internal" => url.internal->slug.current,
        url.type == "external" => url.external,
        url.href
      ),
      ${imageFragment},
    })
  }
`;

const heroBlock = /* groq */ `
  _type == "hero" => {
    ...,
    ${richTextFragment},
    ${imagesFragment},
    ${buttonFragment}
  }
`;

const faqFragment = /* groq */ `
  "faqs": array::compact(faqs[]->{
    title,
    _id,
    _type,
    ${richTextFragment}
  })
`;

const faqAccordionBlock = /* groq */ `
  _type == "faqAccordion" => {
    ...,
    ${faqFragment},
    link{
      ...,
      "openInNewTab": url.openInNewTab,
      "href": select(
        url.type == "internal" => url.internal->slug.current,
        url.type == "external" => url.external,
        url.href
      )
    }
  }
`;

const subscribeNewsletterBlock = /* groq */ `
  _type == "subscribeNewsletter" => {
    ...,
    "subTitle": subTitle[]{
      ...,
      ${markDefsFragment}
    },
    "helperText": helperText[]{
      ...,
      ${markDefsFragment}
    }
  }
`;

const testimonialListBlock = /* groq */ `
    _type == "testimonialList" => {
      ...,
      pretitle,
      intro[]{
        ...
      },
      testimonials[]->{
        ...,
        client,
        text,
        "category": category->title,
        "location": location->{country, region},
        ${imageFragment},
      }
    }
`;

const featuredTestimonialBlock = /* groq */ `
    _type == "featuredTestimonial" => {
      ...
      heading,
      ${imageFragment},
      testimonial->{
        ...,
        client,
        text,
        "category": category->title,
        "location": location->{country, region},
      }
    }
`;
const briefServicesDescriptionBlock = /* groq */ `
    _type == "briefServicesDescription" => {
      ...
      firstText,
      secondText,
      ${imagesFragment},
    }
`;

const pricesBlock = /* groq */ `
  _type == "prices" => {
    ...
    pretitle,
    heading,
    currency,
    pricingTiers[]->{
      ...,
      price,
      category,
      content,
      ${imageFragment},
    },
    ${buttonFragment},
  }
`;

const aboutMeBlock = /* groq */ `
  _type == "aboutMe" => {
    ...,
    pretitle,
    richText,
    ${imageFragment},
    ${buttonFragment},
  }
`;

const mySpecialities = /* groq */ `
  _type == "mySpecialities" => {
    ...,
    pretitle,
    heading,
    richText,
    ${imagesFragment},
    ${buttonFragment},
  }
`;
const contactForm = /* groq */ `
  _type == "contactForm" => {
    ...,
    image,
  }
`;

const latestBlogsBlock = /* groq */ `
  _type == "latestBlogs" => {
    ...,
    "blogs": select(
      showFeatured => 
        featuredBlogs[]->{
          ${blogCardFragment}
        },
      *[_type == "blog"] | order(publishedAt desc)[0...2] {
        ${blogCardFragment},
      }
    )
  }
`;

const pageBuilderFragment = /* groq */ `
  pageBuilder[]{
    ...,
    _type,
    ${ctaBlock},
    ${heroBlock},
    ${faqAccordionBlock},
    ${subscribeNewsletterBlock},
    ${imageLinkCardsBlock},
    ${testimonialListBlock},
    ${featuredTestimonialBlock},
    ${briefServicesDescriptionBlock},
    ${pricesBlock},
    ${aboutMeBlock},
    ${mySpecialities},
    ${contactForm},
    ${latestBlogsBlock}
  }
`;

export const queryHomePageData =
  defineQuery(/* groq */ `*[_type == "homePage" && _id == "homePage"][0]{
    ...,
    _id,
    _type,
    "slug": slug.current,
    title,
    description,
    ${pageBuilderFragment}
  }`);

export const querySlugPageData = defineQuery(/* groq */ `
  *[_type == "page" && slug.current == $slug][0]{
    ...,
    "slug": slug.current,
    ${pageBuilderFragment}
  }
  `);

export const querySlugPagePaths = defineQuery(/* groq */ `
  *[_type == "page" && defined(slug.current)].slug.current
`);

export const queryBlogIndexPageData = defineQuery(/* groq */ `
  *[_type == "blogIndex"][0]{
    ...,
    _id,
    _type,
    title,
    description,
    ${pageBuilderFragment},
    "slug": slug.current,
    "featuredBlog": featured[0]->{
      ${blogCardFragment}
    }
  }{
    ...@,
    "blogs": *[_type == "blog" && (_id != ^.featuredBlog._id) && (seoHideFromLists != true)]{
      ${blogCardFragment}
    }
  }
`);

export const queryBlogSlugPageData = defineQuery(/* groq */ `
  *[_type == "blog" && slug.current == $slug][0]{
    ...,
    "slug": slug.current,
    ${blogAuthorFragment},
    ${imageFragment},
    ${richTextFragment},
    ${pageBuilderFragment}
  }
`);

// PORTFOLIO QUERIES

export const queryPortfolioNavigationData = defineQuery(/* groq */ `
  *[_type == "portfolioNavigation" && _id == "portfolioNavigation"][0]{
    links[]{
      _key,
      name,
      "href": url.link->{
        title,
        "slug": slug.current,
      }
    }
  }
`);

const portfolioPhotosFragment = /* groq */ `
  photos[]{
    ...,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height,
    "src": asset->url,
    "alt": coalesce(asset->altText, asset->originalFilename, "Image-Broken"),
    "blurData": asset->metadata.lqip,
    "dominantColor": asset->metadata.palette.dominant.background,
  }
`;

export const queryPortfolioIndexPageDescription = defineQuery(/* groq */ `
  *[_type == "portfolioIndex"][0]{
    _id,
    _type,
    title,
    description,
  }
`);

export const queryPortfolioIndexPageData = defineQuery(/* groq */ `
  *[_type == "portfolioIndex"][0]{
    ...,
    _id,
    _type,
    title,
    description,
    "slug": slug.current,
    ${portfolioPhotosFragment}
  }
`);

export const queryPortfolioSlugPageData =
  defineQuery(/* groq */ `*[_type == "portfolio" && slug.current == $slug][0]{
    ...,
    _id,
    _type,
    title,
    description,
    "slug": slug.current,
    ${portfolioPhotosFragment}
  }`);
export const queryPortfolioPaths = defineQuery(`
    *[_type == "portfolio" && defined(slug.current)].slug.current
  `);

// END

export const queryBlogPaths = defineQuery(`
  *[_type == "blog" && defined(slug.current)].slug.current
`);

const ogFieldsFragment = /* groq */ `
  _id,
  _type,
  "title": select(
    defined(ogTitle) => ogTitle,
    defined(seoTitle) => seoTitle,
    title
  ),
  "description": select(
    defined(ogDescription) => ogDescription,
    defined(seoDescription) => seoDescription,
    description
  ),
  "image": image.asset->url + "?w=566&h=566&dpr=2&fit=max",
  "dominantColor": image.asset->metadata.palette.dominant.background,
  "seoImage": seoImage.asset->url + "?w=1200&h=630&dpr=2&fit=max", 
  "logo": *[_type == "settings"][0].logo.asset->url + "?w=80&h=40&dpr=3&fit=max&q=100",
  "date": coalesce(date, _createdAt)
`;

export const queryHomePageOGData = defineQuery(/* groq */ `
  *[_type == "homePage" && _id == $id][0]{
    ${ogFieldsFragment}
  }
  `);

export const querySlugPageOGData = defineQuery(/* groq */ `
  *[_type == "page" && _id == $id][0]{
    ${ogFieldsFragment}
  }
`);

export const queryBlogPageOGData = defineQuery(/* groq */ `
  *[_type == "blog" && _id == $id][0]{
    ${ogFieldsFragment}
  }
`);

export const queryGenericPageOGData = defineQuery(/* groq */ `
  *[ defined(slug.current) && _id == $id][0]{
    ${ogFieldsFragment}
  }
`);

export const queryFooterData = defineQuery(/* groq */ `
  *[_type == "footer" && _id == "footer"][0]{
    _id,
    subtitle,
    columns[]{
      _key,
      title,
      links[]{
        _key,
        name,
        "openInNewTab": url.openInNewTab,
        "href": select(
          url.type == "internal" => url.internal->slug.current,
          url.type == "external" => url.external,
          url.href
        ),
      }
    },
    "logo": *[_type == "settings"][0].logo.asset->url + "?w=80&h=40&dpr=3&fit=max",
    "siteTitle": *[_type == "settings"][0].siteTitle,
    "socialLinks": *[_type == "settings"][0].socialLinks,
  }
`);

export const queryNavbarData = defineQuery(/* groq */ `
  *[_type == "navbar" && _id == "navbar"][0]{
    _id,
    columns[]{
      _key,
      _type == "navbarColumn" => {
        "type": "column",
        title,
        links[]{
          _key,
          name,
          icon,
          description,
          "openInNewTab": url.openInNewTab,
          "href": select(
            url.type == "internal" => url.internal->slug.current,
            url.type == "external" => url.external,
            url.href
          )
        }
      },
      _type == "navbarLink" => {
        "type": "link",
        name,
        description,
        "openInNewTab": url.openInNewTab,
        "href": select(
          url.type == "internal" => url.internal->slug.current,
          url.type == "external" => url.external,
          url.href
        )
      }
    },
    ${buttonsFragment},
    "logo": *[_type == "settings"][0].logo.asset->url + "?w=80&h=40&dpr=3&fit=max",
    "siteTitle": *[_type == "settings"][0].siteTitle,
  }
`);

export const querySitemapData = defineQuery(/* groq */ `{
  "slugPages": *[_type == "page" && defined(slug.current)]{
    "slug": slug.current,
    "lastModified": _updatedAt
  },
  "blogPages": *[_type == "blog" && defined(slug.current)]{
    "slug": slug.current,
    "lastModified": _updatedAt
  }
}`);
