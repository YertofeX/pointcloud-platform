import { PointCloudData, Project, User } from "@api/types";
import {
  AreaMeasurement,
  DistanceMeasurement,
  HeightMeasurement,
} from "@api/types/measurementTypes";
import PocketBase, { RecordService } from "pocketbase";

interface TypedPocketBase extends PocketBase {
  collection(idOrName: string): RecordService; // default fallback for any other collection
  collection(idOrName: "users"): RecordService<User>;
  collection(idOrName: "projects"): RecordService<Project>;
  collection(idOrName: "pointclouds"): RecordService<PointCloudData>;
  collection(
    idOrName: "distance_measurements"
  ): RecordService<DistanceMeasurement>;
  collection(idOrName: "area_measurements"): RecordService<AreaMeasurement>;
  collection(idOrName: "height_measurements"): RecordService<HeightMeasurement>;
}

export const pocketBase = new PocketBase(
  // "http://127.0.0.1:8090"
  import.meta.env.VITE_API ?? `http://${location.hostname}:8090`
) as TypedPocketBase;
