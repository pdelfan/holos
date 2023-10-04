// truncate username to first char
export function formatUsername(text: string) {
  return text.charAt(0).toUpperCase();
}

export function truncateText(text: string, limit: number) {
  return text.length > limit ? `${text.substring(0, limit)}...` : text;
}

export function extractUsername(email: string) {
  return email.substring(0, email.lastIndexOf("@"));
}
