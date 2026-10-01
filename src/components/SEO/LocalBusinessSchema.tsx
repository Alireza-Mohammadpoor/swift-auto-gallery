const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",

    "@id": "https://swiftautogallery.com/#business",

    "name": "Swift Auto Gallery",
    "alternateName": "اتوگالری سوییفت",

    "description":
      "اتوگالری سوییفت در کیش؛ خرید و فروش خودروهای لوکس و اقتصادی، سفارش خودرو، ترخیص خودرو، امور پلاک منطقه آزاد و مشاوره تخصصی خودرو.",

    "url": "https://swiftautogallery.com/",

    "telephone": "+989347699899",

    "logo": {
      "@type": "ImageObject",
      "url": "https://swiftautogallery.com/favicon.svg"
    },

    "image": [
      "https://swiftautogallery.com/images/home-car-1.jpg",
      "https://swiftautogallery.com/images/home-car-2.jpg"
    ],

    "address": {
      "@type": "PostalAddress",
      "streetAddress": "جنب پمپ بنزین گلدیس",
      "addressLocality": "کیش",
      "addressRegion": "هرمزگان",
      "addressCountry": "IR"
    },

    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "09:00",
        "closes": "14:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "17:00",
        "closes": "23:00"
      }
    ],

    "sameAs": [
      "https://www.instagram.com/swift.autogallery/"
    ],

    "areaServed": {
      "@type": "Place",
      "name": "Kish Island"
    },

    "currenciesAccepted": "AED",

    "priceRange": "$$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
};

export default LocalBusinessSchema;