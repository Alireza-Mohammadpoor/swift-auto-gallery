const WHATSAPP_PHONE = "989347699899"; // international format, no + or leading 0

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
}

export function buildPhoneUrl(): string {
  return "tel:+989347699899";
}

export const INSTAGRAM_URL = "https://instagram.com/swift.autogallery";
export const INSTAGRAM_HANDLE = "swift.autogallery";
export const BUSINESS_PHONE_DISPLAY = "09347699899";
