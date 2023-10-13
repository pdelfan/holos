export function getHostname(url: string) {
  // Check if the url is defined and is a string
  if (typeof url !== "string") {
    return "";
  }

  const matches = url.match(/\/([^\/?#]+)(?:[\/?#]|$)/i);
  // extract hostname (return name with no www)
  return matches ? matches[1] : url.replace(/^www\./, "");
}

export function getFavicon(url: string) {
  const hostname = getHostname(url);
  return `https://www.google.com/s2/favicons?sz=64&domain_url=https://${hostname}`;
}

export function getShortAddress(url: string) {
  // remove www from url
  const newUrl = getHostname(url);
  return newUrl.replace(/^www\./, "");
}

export async function getSiteMetadata(url: string) {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_SCRAPER}${url}`);
    const result = await data.json();
    return result;
  } catch (error) {
    return error;
  }
}
