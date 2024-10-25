// Returns dark or light based on the contrast of the input color
export const getTextColor = (
  rgba: [number, number, number, number],
  dark: string = "#000000",
  light: string = "#FFFFFF"
): string => {
  if (rgba[0] * 0.299 + rgba[1] * 0.587 + rgba[2] * 0.114 > 186) {
    return dark;
  }
  return light;
};
