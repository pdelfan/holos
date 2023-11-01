interface TripForm {
  title: string;
  date: string;
  elevation: number;
  elevationUnit: string;
  distance: number;
  distanceUnit: string;
  baseWeight: number;
  totalWeight: number;
  weightUnit: string;
}

interface InventoryForm {
  title: string;
  description: string;
  price: number;
  weight: number;
  weightUnit: string;
  season: string;
  image_url: string | null;
  url: string | null;
  image: File | null;
}

interface WishlistForm {
  url: string;
  manualURL?: string;
  title: string;
  imageURL: string;
}
