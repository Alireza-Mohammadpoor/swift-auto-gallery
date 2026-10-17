// import { Helmet } from "react-helmet-async";
// import { SITE_URL } from "@/utils/seo";

// interface SEOProps {
//   title: string;
//   description: string;
//   path: string;
//   structuredData?: object;
//   noindex?: boolean;
//   image?: string;
// }

// export function SEO({ title, description, path, structuredData, noindex, image }: SEOProps) {
//   const url = `${SITE_URL}${path}`;
//   return (
//     <Helmet>
//       <title>{title}</title>
//       <meta name="description" content={description} />
//       <link rel="canonical" href={url} />
//       {noindex && <meta name="robots" content="noindex, nofollow" />}
//       <meta property="og:type" content="website" />
//       <meta property="og:title" content={title} />
//       <meta property="og:description" content={description} />
//       <meta property="og:url" content={url} />
//       {image && <meta property="og:image" content={image} />}
//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:title" content={title} />
//       <meta name="twitter:description" content={description} />
//       {structuredData && (
//         <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
//       )}
//     </Helmet>
//   );
// }





// import { Helmet } from "react-helmet-async";
// import { SITE_URL } from "@/utils/seo";

// interface SEOProps {
//   title: string;
//   description: string;
//   path: string;
//   structuredData?: object | object[];
//   noindex?: boolean;
//   image?: string;

//   /** Overrides the canonical URL with an absolute URL. */
//   canonicalUrl?: string;

//   /** Open Graph content type. */
//   ogType?: "website" | "article";

//   /** Current page language. */
//   locale?: "fa" | "en";

//   /** Alternate URLs for genuine translated versions. */
//   alternates?: {
//     lang: "fa" | "en";
//     path: string;
//   }[];

//   /** Article publication date in ISO format. */
//   publishedTime?: string;

//   /** Article modification date in ISO format. */
//   modifiedTime?: string;
// }

// export function SEO({
//   title,
//   description,
//   path,
//   structuredData,
//   noindex = false,
//   image,
//   canonicalUrl,
//   ogType = "website",
//   locale,
//   alternates,
//   publishedTime,
//   modifiedTime,
// }: SEOProps) {
//   const normalizedPath = path.startsWith("/") ? path : `/${path}`;
//   const url = canonicalUrl ?? `${SITE_URL}${normalizedPath}`;

//   const structuredDataBlocks = structuredData
//     ? Array.isArray(structuredData)
//       ? structuredData
//       : [structuredData]
//     : [];

//   return (
//     <Helmet>
//       {/* Basic SEO */}
//       <title>{title}</title>
//       <meta name="description" content={description} />
//       <link rel="canonical" href={url} />

//       {noindex && (
//         <meta name="robots" content="noindex, nofollow" />
//       )}

//       {/* Language alternates */}
//       {alternates?.map((alternate) => {
//         const alternatePath = alternate.path.startsWith("/")
//           ? alternate.path
//           : `/${alternate.path}`;

//         return (
//           <link
//             key={alternate.lang}
//             rel="alternate"
//             hrefLang={alternate.lang}
//             href={`${SITE_URL}${alternatePath}`}
//           />
//         );
//       })}

//       {/* Open Graph */}
//       <meta property="og:type" content={ogType} />
//       <meta property="og:title" content={title} />
//       <meta property="og:description" content={description} />
//       <meta property="og:url" content={url} />

//       {locale && (
//         <meta
//           property="og:locale"
//           content={locale === "fa" ? "fa_IR" : "en_US"}
//         />
//       )}

//       {image && (
//         <meta property="og:image" content={image} />
//       )}

//       {/* Article metadata */}
//       {ogType === "article" && publishedTime && (
//         <meta
//           property="article:published_time"
//           content={publishedTime}
//         />
//       )}

//       {ogType === "article" && modifiedTime && (
//         <meta
//           property="article:modified_time"
//           content={modifiedTime}
//         />
//       )}

//       {/* Twitter / X */}
//       <meta
//         name="twitter:card"
//         content="summary_large_image"
//       />
//       <meta name="twitter:title" content={title} />
//       <meta name="twitter:description" content={description} />

//       {image && (
//         <meta name="twitter:image" content={image} />
//       )}

//       {/* JSON-LD structured data */}
//       {structuredDataBlocks.map((block, index) => (
//         <script
//           key={`structured-data-${index}`}
//           type="application/ld+json"
//         >
//           {JSON.stringify(block)}
//         </script>
//       ))}
//     </Helmet>
//   );
// }






import { Helmet } from "react-helmet-async";
import { SITE_URL } from "@/utils/seo";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  structuredData?: object | object[];
  noindex?: boolean;
  image?: string;

  /** Overrides the canonical URL with an absolute URL. */
  canonicalUrl?: string;

  /** Open Graph content type. */
  ogType?: "website" | "article";

  /** Current page language. */
  locale?: "fa" | "en";

  /** Alternate URLs for genuine translated versions. */
  alternates?: {
    lang: "fa" | "en";
    path: string;
  }[];

  /** Article publication date in ISO format. */
  publishedTime?: string;

  /** Article modification date in ISO format. */
  modifiedTime?: string;
}

export function SEO({
  title,
  description,
  path,
  structuredData,
  noindex = false,
  image,
  canonicalUrl,
  ogType = "website",
  locale,
  alternates,
  publishedTime,
  modifiedTime,
}: SEOProps) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = canonicalUrl ?? `${SITE_URL}${normalizedPath}`;

  const structuredDataBlocks = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {noindex && (
        <meta name="robots" content="noindex, nofollow" />
      )}

      {/* Language alternates */}
      {alternates?.map((alternate) => {
        const alternatePath = alternate.path.startsWith("/")
          ? alternate.path
          : `/${alternate.path}`;

        return (
          <link
            key={alternate.lang}
            rel="alternate"
            hrefLang={alternate.lang}
            href={`${SITE_URL}${alternatePath}`}
          />
        );
      })}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />

      {locale && (
        <meta
          property="og:locale"
          content={locale === "fa" ? "fa_IR" : "en_US"}
        />
      )}

      {image && (
        <meta property="og:image" content={image} />
      )}

      {/* Article metadata */}
      {ogType === "article" && publishedTime && (
        <meta
          property="article:published_time"
          content={publishedTime}
        />
      )}

      {ogType === "article" && modifiedTime && (
        <meta
          property="article:modified_time"
          content={modifiedTime}
        />
      )}

      {/* Twitter / X */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {image && (
        <meta name="twitter:image" content={image} />
      )}

      {/* JSON-LD structured data */}
      {structuredDataBlocks.map((block, index) => (
        <script
          key={`structured-data-${index}`}
          type="application/ld+json"
        >
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
