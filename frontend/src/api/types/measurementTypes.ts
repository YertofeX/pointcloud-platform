import { User } from "./authTypes";
import { Project } from "./projectTypes";

type Coordinates3D = [number, number, number];
type PolyLine = Coordinates3D[];

type RecordData = {
  id: string;
  created: string;
  updated: string;
};
type RelationData = {
  owner: User;
  project: Project;
};
type MeasurementData = {
  name: string;
  color: string;
  line: PolyLine;
};

type DefaultMeasurementProps = RecordData & RelationData & MeasurementData;

export type DistanceMeasurement = DefaultMeasurementProps;

export type AreaMeasurement = DefaultMeasurementProps;

export type DistanceMeasurementCreateParams = MeasurementData;
export type DistanceMeasurementUpdateParams = Partial<MeasurementData>;

export type AreaMeasurementCreateParams = MeasurementData;
export type AreaMeasurementUpdateParams = Partial<MeasurementData>;
