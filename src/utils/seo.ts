// import type { Vehicle } from "@/types/vehicle";

// const SITE_NAME = "Swift Auto Gallery";
// const SITE_URL = "https://swiftautogallery.com";

// export function buildVehicleTitle(vehicle: Vehicle, lang: "fa" | "en"): string {
//   const base = `${vehicle.brand} ${vehicle.model} ${vehicle.year}`;
//   return lang === "fa"
//     ? `خرید ${vehicle.brand} ${vehicle.model} مدل ${vehicle.year} | اتو گالری سوییفت`
//     : `${base} | ${SITE_NAME}`;
// }

// export function buildVehicleDescription(vehicle: Vehicle, lang: "fa" | "en"): string {
//   if (lang === "fa" && vehicle.description_fa) return vehicle.description_fa.slice(0, 155);
//   if (lang === "en" && vehicle.description_en) return vehicle.description_en.slice(0, 155);
//   return lang === "fa"
//     ? `${vehicle.brand} ${vehicle.model} مدل ${vehicle.year} در اتو گالری سوییفت، جزیره کیش.`
//     : `${vehicle.brand} ${vehicle.model} ${vehicle.year} available at Swift Auto Gallery, Kish Island.`;
// }

// export function buildVehicleStructuredData(vehicle: Vehicle) {
//   return {
//     "@context": "https://schema.org",
//     "@type": "Vehicle",
//     name: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
//     brand: vehicle.brand,
//     model: vehicle.model,
//     vehicleModelDate: String(vehicle.year),
//     mileageFromOdometer: vehicle.mileage
//       ? { "@type": "QuantitativeValue", value: vehicle.mileage, unitCode: "KMT" }
//       : undefined,
//     fuelType: vehicle.fuel_type ?? undefined,
//     vehicleTransmission: vehicle.transmission ?? undefined,
//     color: vehicle.color ?? undefined,
//     offers: {
//       "@type": "Offer",
//       priceCurrency: "AED",
//       price: vehicle.price_aed,
//       availability: vehicle.is_available
//         ? "https://schema.org/InStock"
//         : "https://schema.org/OutOfStock",
//       url: `${SITE_URL}/vehicles/${vehicle.id}`,
//     },
//   };
// }

// export function buildBusinessStructuredData() {
//   return {
//     "@context": "https://schema.org",
//     "@type": "AutomotiveBusiness",
//     name: SITE_NAME,
//     alternateName: "اتو گالری سوییفت",
//     image: `${SITE_URL}/logo.png`,
//     telephone: "+989347699899",
//     address: {
//       "@type": "PostalAddress",
//       addressLocality: "Kish Island",
//       addressCountry: "IR",
//       streetAddress: "Next to Goldis Gas Station",
//     },
//     url: SITE_URL,
//     sameAs: ["https://instagram.com/swift.autogallery"],
//   };
// }

// export { SITE_NAME, SITE_URL };








import type { Vehicle } from "@/types/vehicle";

export const SITE_NAME = "Swift Auto Gallery";
export const SITE_URL = "https://swiftautogallery.com";

/**
 * Vehicle SEO
 */

export function buildVehicleTitle(
  vehicle: Vehicle,
  lang: "fa" | "en"
): string {
  const base = `${vehicle.brand} ${vehicle.model} ${vehicle.year}`;

  return lang === "fa"
    ? `خرید ${vehicle.brand} ${vehicle.model} مدل ${vehicle.year} | اتو گالری سوییفت`
    : `${base} | ${SITE_NAME}`;
}

export function buildVehicleDescription(
  vehicle: Vehicle,
  lang: "fa" | "en"
): string {
  if (lang === "fa" && vehicle.description_fa?.trim()) {
    return vehicle.description_fa.trim().slice(0, 155);
  }

  if (lang === "en" && vehicle.description_en?.trim()) {
    return vehicle.description_en.trim().slice(0, 155);
  }

  return lang === "fa"
    ? `${vehicle.brand} ${vehicle.model} مدل ${vehicle.year} در اتو گالری سوییفت، جزیره کیش.`
    : `${vehicle.brand} ${vehicle.model} ${vehicle.year} available at Swift Auto Gallery, Kish Island.`;
}

/**
 * Vehicle structured data
 */

export function buildVehicleStructuredData(vehicle: Vehicle) {
  const vehicleUrl = `${SITE_URL}/vehicles/${encodeURIComponent(vehicle.id)}`;

  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
    brand: {
      "@type": "Brand",
      name: vehicle.brand,
    },
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),

    ...(vehicle.trim ? { vehicleConfiguration: vehicle.trim } : {}),

    ...(vehicle.mileage != null
      ? {
          mileageFromOdometer: {
            "@type": "QuantitativeValue",
            value: vehicle.mileage,
            unitCode: "KMT",
          },
        }
      : {}),

    ...(vehicle.fuel_type
      ? { fuelType: vehicle.fuel_type }
      : {}),

    ...(vehicle.transmission
      ? { vehicleTransmission: vehicle.transmission }
      : {}),

    ...(vehicle.color ? { color: vehicle.color } : {}),

    ...(vehicle.engine
      ? { vehicleEngine: vehicle.engine }
      : {}),

    ...(vehicle.engine_size
      ? { vehicleDisplacement: vehicle.engine_size }
      : {}),

    ...(vehicle.body_type
      ? { bodyType: vehicle.body_type }
      : {}),

    offers: {
      "@type": "Offer",
      priceCurrency: "AED",
      price: vehicle.price_aed,
      availability: vehicle.is_available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: vehicleUrl,
      itemCondition: "https://schema.org/UsedCondition",
    },
  };
}

/**
 * Business structured data
 */

export function buildBusinessStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    alternateName: "اتو گالری سوییفت",
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    telephone: "+989347699899",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Next to Goldis Gas Station",
      addressLocality: "Kish Island",
      addressRegion: "Hormozgan",
      addressCountry: "IR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
        ],
        opens: "09:00",
        closes: "14:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
        ],
        opens: "17:00",
        closes: "23:00",
      },
    ],
    sameAs: ["https://instagram.com/swift.autogallery"],
  };
}

/**
 * Article structured data
 */

export interface ArticleStructuredDataInput {
  title: string;
  description: string;
  slug: string;
  language: "fa" | "en";
  image?: string | null;
  authorName?: string | null;
  publishedAt: string | null;
  updatedAt: string;
}

export function buildArticleStructuredData(
  article: ArticleStructuredDataInput
) {
  const articleUrl = `${SITE_URL}/blog/${encodeURIComponent(article.slug)}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    inLanguage: article.language,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },

    ...(article.image
      ? {
          image: [article.image],
        }
      : {}),

    ...(article.publishedAt
      ? {
          datePublished: article.publishedAt,
        }
      : {}),

    dateModified: article.updatedAt,

    author: {
      "@type": article.authorName ? "Person" : "Organization",
      name: article.authorName?.trim() || SITE_NAME,
    },

    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };
}

/**
 * Breadcrumb structured data
 */

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function buildBreadcrumbStructuredData(
  items: BreadcrumbItem[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http")
        ? item.path
        : `${SITE_URL}${item.path.startsWith("/") ? "" : "/"}${item.path}`,
    })),
  };
}
