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

type ItemType = "General" | "Consumable" | "Wearable";

interface PackItem {
  position: number;
  image?: string;
  title?: string;
  description?: string;
  link?: string;
  type?: ItemType;
  price: number;
  weight: number;
  weightUnit: string;
  quantity: number;
  groupID: string;
}

interface SelectOption {
  text: string;
  icon?: string;
}

interface WishlistItem {
  created_at: string;
  id: number;
  url: string;
  user_id: string;
}