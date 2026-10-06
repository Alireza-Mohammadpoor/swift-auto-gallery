declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export const GTM_ID = "GTM-5SGFZ7X9";

export const initializeGTM = () => {
  if (!GTM_ID || typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });

  const script = document.createElement("script");

  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;

  document.head.appendChild(script);
};