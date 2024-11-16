import { toVec3 } from "@modules/workspace/utils/toVec3";

describe("toVec3", () => {
  it("should return a new Vector3 with the correct coordinates", () => {
    const coordinates: [number, number, number] = [1, 2, 3];

    const { x, y, z } = toVec3(coordinates);

    expect(x).toEqual(1);
    expect(y).toEqual(2);
    expect(z).toEqual(3);
  });
});
