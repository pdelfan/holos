import { atom } from "jotai";
import CardIcon from "@/assets/icons/cardIcon.svg";
import mediumIcon from "@/assets/icons/mediumIcon.svg";
import compactIcon from "@/assets/icons/compactIcon.svg";
import TimeIcon from "@/assets/icons/timeIcon.svg";
import ALphabetIcon from "@/assets/icons/alphabetIcon.svg";

export const wishlistAtom = atom<WishlistItem[] | []>([]);

export const wishlistSearchAtom = atom<string>("");

export const viewFilterOptions: SelectOption[] = [
  { text: "Large", icon: CardIcon },
  { text: "Medium", icon: mediumIcon },
  { text: "Compact", icon: compactIcon },
];

export const viewFilterAtom = atom<SelectOption>(viewFilterOptions[0]);

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
