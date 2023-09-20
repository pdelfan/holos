import { atom } from "jotai";
import CardIcon from "@/assets/icons/cardIcon.svg";
import mediumIcon from "@/assets/icons/mediumIcon.svg";
import compactIcon from "@/assets/icons/compactIcon.svg";
import TimeIcon from "@/assets/icons/timeIcon.svg";
import ALphabetIcon from "@/assets/icons/alphabetIcon.svg";
import WinterIcon from "@/assets/icons/winterIcon.svg";
import AllIcon from "@/assets/icons/allIcon.svg";

export const currencyAtom = atom<string>("");

export const packAtom = atom<Pack | null>(null);

export const packsAtom = atom<Pack[] | []>([]);

export const groupsAtom = atom<Group[] | []>([]);

export const packStatsAtom = atom<PackStats[] | []>([]);

export const tripsAtom = atom<TripItem[] | []>([]);

export const inventoryAtom = atom<InventoryItem[] | []>([]);

export const wishlistAtom = atom<WishlistItem[] | []>([]);

export const wishlistSearchAtom = atom<string>("");

export const tripSearchAtom = atom<string>("");

export const inventorySearchAtom = atom<string>("");

export const packSearchAtom = atom<string>("");

export const viewFilterOptions: SelectOption[] = [
  { text: "Large", icon: CardIcon },
  { text: "Medium", icon: mediumIcon },
  { text: "Compact", icon: compactIcon },
];

export const viewFilterAtom = atom<SelectOption>(viewFilterOptions[0]);

export const seasonFilterOptions: SelectOption[] = [
  { text: "Show All" },
  { text: "Winter", icon: WinterIcon },
  { text: "3-Season", icon: AllIcon },
];

export const seasonFilterAtom = atom<SelectOption>(seasonFilterOptions[0]);

export const sortFilterOptions: SelectOption[] = [
  {
    text: "By Date ↓",
    icon: TimeIcon,
  },
  {
    text: "By Date ↑",
    icon: TimeIcon,
  },
  {
    text: "By Name ↓",
    icon: ALphabetIcon,
  },
  {
    text: "By Name ↑",
    icon: ALphabetIcon,
  },
];

export const sortFilterAtom = atom<SelectOption>(sortFilterOptions[0]);

export const tabs = [
  { id: "packs", title: "PACKS", href: "/dashboard/packs" },
  { id: "trips", title: "TRIPS", href: "/dashboard/trips" },
  { id: "inventory", title: "INVENTORY", href: "/dashboard/inventory" },
  { id: "wishlist", title: "WISHLIST", href: "/dashboard/wishlist" },
];

export const navAtom = atom(tabs[0]);
