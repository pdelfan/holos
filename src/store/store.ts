import { atom } from "jotai";

export const packsAtom = atom<Pack[] | []>([]);
export const tripsAtom = atom<TripItem[] | []>([]);
export const inventoryAtom = atom<InventoryItem[] | []>([]);
export const wishlistAtom = atom<WishlistItem[] | []>([]);
export const tabs = [
  { id: "packs", title: "PACKS", href: "/dashboard/packs" },
  { id: "trips", title: "TRIPS", href: "/dashboard/trips" },
  { id: "inventory", title: "INVENTORY", href: "/dashboard/inventory" },
  { id: "wishlist", title: "WISHLIST", href: "/dashboard/wishlist" },
];
export const navAtom = atom(tabs[0]);
