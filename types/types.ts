interface WishlistItem {
  title: string | null;
  url: string;
}

interface Metadata {
  url: string;
  title: string;
  image: string;
  logo: string;
}

interface PackSummary {
  baseWeight: number;
  totalWeight: number;
  totalCost: number;
  totalItems: number;
}
