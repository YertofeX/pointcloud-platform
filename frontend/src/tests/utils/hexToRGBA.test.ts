import { hexToRGBA } from "@modules/workspace/utils/hexToRGBA";

describe("hexToRGBA", () => {
  it("should return the correct RGBA value for #FFFFFF", () => {
    const hex = "#FFFFFF";

    const [r, g, b, a] = hexToRGBA(hex);

    expect(r).toEqual(255);
    expect(g).toEqual(255);
    expect(b).toEqual(255);
    expect(a).toEqual(1);
  });
  it("should return the correct RGBA value for #000000", () => {
    const hex = "#000000";

    const [r, g, b, a] = hexToRGBA(hex);

    expect(r).toEqual(0);
    expect(g).toEqual(0);
    expect(b).toEqual(0);
    expect(a).toEqual(1);
  });
  it("should return the correct RGBA value for given hex", () => {
    const hex = "#39b359";

    const [r, g, b, a] = hexToRGBA(hex);

    expect(r).toEqual(57);
    expect(g).toEqual(179);
    expect(b).toEqual(89);
    expect(a).toEqual(1);
  });
});
