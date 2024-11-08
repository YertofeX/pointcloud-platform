import { User } from "./authTypes";
import { Project } from "./projectTypes";

export type PointCloudData = {
  id: string;
  owner: User;
  project: Project;
  name: string;
  visible: boolean;
  raw: string;
  metadata: string;
  hierarchy: string;
  octree: string;
  log: string;
  created: string;
  updated: string;
};

export type PointCloudCreateparams = {
  projectID: string;
  raw: File;
  name: string;
  visible: boolean;
};

export type PointCloudUpdateParams = {
  owner?: string;
  project?: string;
  name?: string;
  visible?: boolean;
};
