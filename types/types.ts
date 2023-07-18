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

interface ChartData {
  category: string;
  weight: number;
}

interface InventoryData {
  title: string;
  image?: string;
  description?: string;
  tag?: string;
  price?: number;
  weight?: number;
}
