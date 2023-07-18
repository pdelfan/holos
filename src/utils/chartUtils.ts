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
];

export const generateRandomColour = () => {
  const randomColour = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return randomColour;
};
