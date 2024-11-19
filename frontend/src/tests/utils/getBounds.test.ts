import { getBounds } from "@modules/workspace/utils/getBounds";
import { Vector3 } from "three";

describe("getBounds", () => {
  it("should return the correct bounding box for a line", () => {
    const points = [
      new Vector3(1, 1, 1),
      new Vector3(-1, 1, 1),
      new Vector3(-1, -1, 1),
      new Vector3(1, -1, 1),
      new Vector3(1, -1, -1),
      new Vector3(1, 1, -1),
      new Vector3(-1, 1, -1),
      new Vector3(-1, -1, -1),
    ];

    const bounds = getBounds(points);
    const target = new Vector3();
    bounds.getCenter(target);
    const { x, y, z } = target;

    expect(x).toEqual(0);
    expect(y).toEqual(0);
    expect(z).toEqual(0);
  });
});
