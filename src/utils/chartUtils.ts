import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";

export const CHART_COLOURS = [
  "#FF047D",
  "#1E9500",
  "#8F00FF",
  "#6F0000",
  "#808080",
  "#009987",
  "#BBB400",
  "#0085FF",
  "#003f5c",
  "#58508d",
  "#bc5090",
  "#ff6361",
  "#ffa600",
  "#b3bfd1",
  "#6b506b",
  "#de25da",
  "#0040ff",
  "#cbd6e4",
  "#c9e52f",
  "#76c68f",
  "#df8879",
  "#222222",
  "#ff7b00",
  "#4DE64D",
  "#FFC5C5",
  "#374134",
  "#22a7f0",
  "#a4a2a8",
  "#a6d75b",
  "#d0ee11",
  "#bfcbdb",
  "#3b3734",
  "#ab3da9",
  "#eb44e8",
  "#0020ff",
  "#0060ff",
  "#009fff",
  "#ffb400",
  "#786028",
  "#48446e",
  "#776bcd",
  "#d7658b",
  "#466964",
  "#3c4e4b",
];

export const generateRandomColour = () => {
  const randomColour = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return randomColour;
};
