import { PointcloudData, Project, User } from "@api/types";
import {
  AreaMeasurement,
  DistanceMeasurement,
} from "@api/types/measurementTypes";
import PocketBase, { RecordService } from "pocketbase";

interface TypedPocketBase extends PocketBase {
  collection(idOrName: string): RecordService; // default fallback for any other collection
  collection(idOrName: "users"): RecordService<User>;
  collection(idOrName: "projects"): RecordService<Project>;
  collection(idOrName: "pointclouds"): RecordService<PointcloudData>;
  collection(
    idOrName: "distance_measurements"
  ): RecordService<DistanceMeasurement>;
  collection(idOrName: "area_measurements"): RecordService<AreaMeasurement>;
}

export const pocketBase = new PocketBase(
  // "http://127.0.0.1:8090"
  `http://${location.hostname}:8090`
) as TypedPocketBase;
