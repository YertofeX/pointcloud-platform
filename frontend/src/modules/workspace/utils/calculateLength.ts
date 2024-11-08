import { Vector3 } from "three";

export const calculateLength = (points: Vector3[]): number => {
  if (points.length >= 2) {
    let len = 0;
    for (let i = 1; i < points.length; i++) {
      const p1 = points[i - 1];
      const p2 = points[i];
      len += p1.distanceTo(p2);
    }

    return len;
  }
  return 0;
};

export const formatLength = (length: number): string => {
  return `${Math.round(length * 100) / 100} m`;
};
