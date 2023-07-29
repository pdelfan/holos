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

interface InventoryItem {
  id: number;
  created_at: string;
  title: string;
  image_url: string | null;
  url: string | null;
  description: string | null;
  type: string;
  price?: number;
  weight?: number;
  weight_unit: string;
  season: string;
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

type ElevationUnit = "m" | "ft";
type DistanceUnit = "km" | "mi";
type WeightUnit = "kg" | "g" | "lb" | "oz";

interface TripItem {
  created_at: string;
  id: number;
  title: string;
  date: string;
  elevation: number;
  elevation_unit: string;
  distance: number;
  distance_unit: string;
  base_weight: number;
  total_weight: number;
  weight_unit: string;
  user_id: string;
}

type Season = "Winter" | "Spring" | "Summer" | "Fall" | "3-Season";
