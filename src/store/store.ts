import { atom } from "jotai";

interface WishlistItem {
  created_at: string;
  id: number;
  url: string;
  user_id: string;
}

export const wishlistAtom = atom<WishlistItem[] | []>([]);
