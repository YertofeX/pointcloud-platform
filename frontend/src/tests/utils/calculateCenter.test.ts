import { calculateCenter } from "@modules/workspace/utils/calculateCenter";
import { Vector3 } from "three";

describe("calculateCenter", () => {
  it("should return the correct center", () => {
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

    const { x, y, z } = calculateCenter(...points);

    expect(x).toEqual(0);
    expect(y).toEqual(0);
    expect(z).toEqual(0);
  });
});
