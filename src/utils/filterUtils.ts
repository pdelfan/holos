import CardIcon from "@/assets/icons/cardIcon.svg";
import mediumIcon from "@/assets/icons/mediumIcon.svg";
import compactIcon from "@/assets/icons/compactIcon.svg";
import TimeIcon from "@/assets/icons/timeIcon.svg";
import ALphabetIcon from "@/assets/icons/alphabetIcon.svg";
import WinterIcon from "@/assets/icons/winterIcon.svg";
import AllIcon from "@/assets/icons/allIcon.svg";

export const viewFilterOptions: SelectOption[] = [
  { text: "Large", icon: CardIcon },
  { text: "Medium", icon: mediumIcon },
  { text: "Compact", icon: compactIcon },
];

export const seasonFilterOptions: SelectOption[] = [
  { text: "Show All" },
  { text: "Winter", icon: WinterIcon },
  { text: "3-Season", icon: AllIcon },
];

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

export const sortWishlist = (wishlist: WishlistItem[], sortMode: string) =>
  [...wishlist].sort((a, b) => {
    if (sortMode === "By Date ↓") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    if (sortMode === "By Date ↑") {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }

    if (sortMode === "By Name ↓") {
      return a.url.localeCompare(b.url);
    }
    if (sortMode === "By Name ↑") {
      return b.url.localeCompare(a.url);
    }
    return 0;
  });

export const sortInventory = (inventory: InventoryItem[], sortMode: string) =>
  [...inventory].sort((a, b) => {
    if (sortMode === "By Date ↓") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    if (sortMode === "By Date ↑") {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }

    if (sortMode === "By Name ↓") {
      return a.title.localeCompare(b.title);
    }
    if (sortMode === "By Name ↑") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

export const sortTrips = (wishlist: TripItem[], sortMode: string) =>
  [...wishlist].sort((a, b) => {
    if (sortMode === "By Date ↓") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortMode === "By Date ↑") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }

    if (sortMode === "By Name ↓") {
      return a.title.localeCompare(b.title);
    }
    if (sortMode === "By Name ↑") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

export const sortPacks = (pack: Pack[], sortMode: string) =>
  [...pack].sort((a, b) => {
    if (sortMode === "By Date ↓") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    if (sortMode === "By Date ↑") {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }

    if (sortMode === "By Name ↓") {
      return a.title.localeCompare(b.title);
    }
    if (sortMode === "By Name ↑") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });
