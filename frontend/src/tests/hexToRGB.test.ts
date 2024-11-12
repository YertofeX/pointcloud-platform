import { hexToRGBObject } from "@modules/workspace/utils/hexToRGB";

describe("hexToRGB", () => {
  it("should return the correct RGB value for #FFFFFF", () => {
    const hex = "#FFFFFF";

    const result = hexToRGBObject(hex);

    expect(result).not.toBeNull();

    const { r, g, b } = result as {
      r: number;
      g: number;
      b: number;
    };

    expect(r).toEqual(255);
    expect(g).toEqual(255);
    expect(b).toEqual(255);
  });
  it("should return the correct RGB value for #000000", () => {
    const hex = "#000000";

    const result = hexToRGBObject(hex);

    expect(result).not.toBeNull();

    const { r, g, b } = result as {
      r: number;
      g: number;
      b: number;
    };

    expect(r).toEqual(0);
    expect(g).toEqual(0);
    expect(b).toEqual(0);
  });
  it("should return the correct RGB value for given hex", () => {
    const hex = "#39b359";

    const result = hexToRGBObject(hex);

    expect(result).not.toBeNull();

    const { r, g, b } = result as {
      r: number;
      g: number;
      b: number;
    };

    expect(r).toEqual(57);
    expect(g).toEqual(179);
    expect(b).toEqual(89);
  });
});
