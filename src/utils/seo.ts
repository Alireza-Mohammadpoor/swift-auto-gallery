import type { Vehicle } from "@/types/vehicle";

const SITE_NAME = "Swift Auto Gallery";
const SITE_URL = "https://swiftautogallery.com";

export function buildVehicleTitle(vehicle: Vehicle, lang: "fa" | "en"): string {
  const base = `${vehicle.brand} ${vehicle.model} ${vehicle.year}`;
  return lang === "fa"
    ? `خرید ${vehicle.brand} ${vehicle.model} مدل ${vehicle.year} | اتو گالری سوییفت`
    : `${base} | ${SITE_NAME}`;
}

export function buildVehicleDescription(vehicle: Vehicle, lang: "fa" | "en"): string {
  if (lang === "fa" && vehicle.description_fa) return vehicle.description_fa.slice(0, 155);
  if (lang === "en" && vehicle.description_en) return vehicle.description_en.slice(0, 155);
  return lang === "fa"
    ? `${vehicle.brand} ${vehicle.model} مدل ${vehicle.year} در اتو گالری سوییفت، جزیره کیش.`
    : `${vehicle.brand} ${vehicle.model} ${vehicle.year} available at Swift Auto Gallery, Kish Island.`;
}

export function buildVehicleStructuredData(vehicle: Vehicle) {
  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
    brand: vehicle.brand,
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    mileageFromOdometer: vehicle.mileage
      ? { "@type": "QuantitativeValue", value: vehicle.mileage, unitCode: "KMT" }
      : undefined,
    fuelType: vehicle.fuel_type ?? undefined,
    vehicleTransmission: vehicle.transmission ?? undefined,
    color: vehicle.color ?? undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "AED",
      price: vehicle.price_aed,
      availability: vehicle.is_available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/vehicles/${vehicle.id}`,
    },
  };
}

export function buildBusinessStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: SITE_NAME,
    alternateName: "اتو گالری سوییفت",
    image: `${SITE_URL}/logo.png`,
    telephone: "+989347699899",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kish Island",
      addressCountry: "IR",
      streetAddress: "Next to Goldis Gas Station",
    },
    url: SITE_URL,
    sameAs: ["https://instagram.com/swift.autogallery"],
  };
}

export { SITE_NAME, SITE_URL };
