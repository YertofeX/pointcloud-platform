import { calculateArea } from "@modules/workspace/utils/calculateArea";
import { Vector3 } from "three";

describe("calculateArea", () => {
  it("should return the correct 2D area for a unit square", () => {
    const points = [
      new Vector3(0, 0, 0),
      new Vector3(1, 0, 0),
      new Vector3(1, 1, 0),
      new Vector3(0, 1, 0),
      new Vector3(0, 0, 0),
    ];

    expect(calculateArea(points)).toEqual(1);
  });
  it("should return the correct 2D area for a unit square regardless of the Z coordinate", () => {
    const points = [
      new Vector3(0, 0, 123),
      new Vector3(1, 0, 321),
      new Vector3(1, 1, 456),
      new Vector3(0, 1, 765),
      new Vector3(0, 0, 867),
    ];

    expect(calculateArea(points)).toEqual(1);
  });
});
