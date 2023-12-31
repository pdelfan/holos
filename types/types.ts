interface Metadata {
  url: string;
  title: string;
  image: string;
  logo: string;
}

interface Pack {
  id: number;
  base_weight: number;
  created_at: string;
  description: string;
  title: string;
  total_cost: number;
  total_items: number;
  total_weight: number;
  weight_unit: string;
  is_public: boolean;
  share_id: string;
  user_id: string;
}

interface PackSummary {
  weight_unit: string;
  base_weight: number;
  total_weight: number;
  currency: string;
  total_cost: number;
  total_items: number;
}

interface ChartData {
  weight_unit: string;
  group_id: number;
  group: string;
  weight: number;
}

interface InventoryItem {
  id: number;
  created_at: string;
  title: string;
  image_url: string | null;
  url: string | null;
  description: string | null;
  price: number;
  weight: number;
  weight_unit: string;
  season: string;
}

type ItemType = "General" | "Consumable" | "Wearable";

interface PackItemWithoutInventory {
  id: number;
  position: number;
  quantity: number;
  group_id: number;
  inventory_id: number;
  type: string;
}

interface PackItem {
  id: number;
  position: number;
  quantity: number;
  group_id: number;
  inventory_id: number;
  type: string;
  inventory: InventoryItem;
}

interface SelectOption {
  text: string;
  icon?: string;
}

interface WishlistItem {
  created_at: string;
  id: number;
  url: string;
  title: string | null;
  image_url: string | null;
  logo_url: string | null;
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

type Season = "Winter" | "3-Season";

interface TotalGroup {
  price: number;
  weight: number;
  quantity: number;
}

interface Group {
  id: number;
  title: string;
  pack_id: number;
  user_id: string;
  total_base_weight: number;
  total_weight: number;
  weight_unit: string;
  total_quantity: number;
  total_price: number;
  position: number;
}

interface PackStats {
  group_id: number;
  group_title: string;
  total_weight: number;
  base_weight: number;
  weight_unit: string;
  price: number;
  quantity: number;
}

interface GroupData {
  id: number;
  title: string;
  pack_id: number;
  user_id: string;
  total_base_weight: number;
  total_weight: number;
  weight_unit: string;
  total_quantity: number;
  total_price: number;
  pack_item: PackItem[];
  position: number;
}

interface Currency {
  currency: string;
  abbreviation: string;
  symbol: string;
}

interface UserData {
  name: string | null;
  avatar_url: string | null;
  email: string;
  id: string;
}

interface Error {
  name: string;
  status: number | undefined;
  message: string;
}