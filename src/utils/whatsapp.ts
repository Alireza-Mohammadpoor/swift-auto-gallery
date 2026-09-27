// const WHATSAPP_PHONE = "09347699899"; // international format, no + or leading 0

// export function buildWhatsAppUrl(message: string): string {
//   const encoded = encodeURIComponent(message);
//   return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
// }

// export function buildPhoneUrl(): string {
//   return "tel:+989347699899";
// }

// export const INSTAGRAM_URL = "https://instagram.com/swift.autogallery";
// export const INSTAGRAM_HANDLE = "swift.autogallery";
// export const BUSINESS_PHONE_DISPLAY = "09347699899";


const WHATSAPP_CHAT_URL =
  "https://wa.me/message/JDOLWVB7CXI2H1";

// export function buildWhatsAppUrl(): string {
//   return WHATSAPP_CHAT_URL;
// }

export function buildWhatsAppUrl(message?: string): string {
  if (!message) {
    return WHATSAPP_CHAT_URL;
  }

  const separator = WHATSAPP_CHAT_URL.includes("?") ? "&" : "?";
  return `${WHATSAPP_CHAT_URL}${separator}text=${encodeURIComponent(message)}`;
}

export function buildPhoneUrl(): string {
  return "tel:+989347699899";
}

export const INSTAGRAM_URL =
  "https://instagram.com/swift.autogallery";

export const INSTAGRAM_HANDLE =
  "swift.autogallery";

export const BUSINESS_PHONE_DISPLAY =
  "09347699899";