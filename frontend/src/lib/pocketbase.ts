import { Project, User } from "@api/types";
import PocketBase, { RecordService } from "pocketbase";

interface TypedPocketBase extends PocketBase {
  collection(idOrName: string): RecordService; // default fallback for any other collection
  collection(idOrName: "users"): RecordService<User>;
  collection(idOrName: "projects"): RecordService<Project>;
}

export const pocketBase = new PocketBase(
  // "http://127.0.0.1:8090"
  `http://${location.hostname}:8090`
) as TypedPocketBase;
