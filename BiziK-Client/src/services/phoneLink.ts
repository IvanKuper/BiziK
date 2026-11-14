// "050-123 4567" -> "tel:0501234567", so the Call button and the QR code dial directly.
export const phoneLink = (phone: string): string => `tel:${phone.replace(/[^\d+]/g, "")}`;
