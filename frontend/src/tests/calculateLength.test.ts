import { calculateLength } from "@modules/workspace/utils/calculateLength";
import { Vector3 } from "three";

describe("calculateLength", () => {
  it("should return the correct length for a line with two points", () => {
    const points = [new Vector3(0, 0, 0), new Vector3(1, 0, 0)];
    expect(calculateLength(points)).toEqual(1);
  });
  it("should return the correct length for a line with multiple segements", () => {
    const points = [
      new Vector3(3, 0, 0),
      new Vector3(0, 0, 0),
      new Vector3(0, 4, 0),
    ];

    expect(calculateLength(points)).toEqual(7);
  });
  it("should return the correct length for a closed line with multiple segments", () => {
    const points = [
      new Vector3(3, 0, 0),
      new Vector3(0, 0, 0),
      new Vector3(0, 4, 0),
      new Vector3(3, 0, 0),
    ];

    expect(calculateLength(points)).toEqual(12);
  });
});
