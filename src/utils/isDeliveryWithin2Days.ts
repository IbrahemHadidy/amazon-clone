export default function isDeliveryWithin2Days(text: string): boolean {
  const lowerText = text.toLowerCase();

  // Check for "day" with 1 or 2 before it
  if (/(\b[12]\s*day\b)/.test(lowerText)) return true;

  // Check for "hour" with 48 or less before it
  if (/(\b([1-9]|[1-3][0-9]|4[0-8])\s*hour\b)/.test(lowerText)) return true;

  // Check for "overnight"
  if (lowerText.includes('overnight')) return true;

  return false;
}
