import { getTextColor } from "@modules/workspace/utils/getTextColor";

describe("getTextColor", () => {
  it("should return #FFFFFF for dark parameter", () => {
    const color: [number, number, number, number] = [19, 33, 23, 1];

    const textColor = getTextColor(color);

    expect(textColor).toEqual("#FFFFFF");
  });
  it("should return #000000 for light parameter", () => {
    const color: [number, number, number, number] = [206, 238, 215, 1];

    const textColor = getTextColor(color);

    expect(textColor).toEqual("#000000");
  });
  it("should return the given light color for dark parameter", () => {
    const color: [number, number, number, number] = [19, 33, 23, 1];
    const darkText = "#1c1c1c";
    const lightText = "#f0f0f0";

    const textColor = getTextColor(color, darkText, lightText);

    expect(textColor).toEqual("#f0f0f0");
  });
  it("should return the given dark color for light parameter", () => {
    const color: [number, number, number, number] = [206, 238, 215, 1];
    const darkText = "#1c1c1c";
    const lightText = "#f0f0f0";

    const textColor = getTextColor(color, darkText, lightText);

    expect(textColor).toEqual("#1c1c1c");
  });
});
