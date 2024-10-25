import { MAIN_LAYER_GROUPS } from "./mainLayerGroups";

type VisibilityData = {
  visible: boolean;
};

export type LayerData<K extends string = string> = {
  id: K;
  title: string;
} & VisibilityData;

export type LayerGroupData<K extends string = string> = {
  id: K;
  title: string;
  content: LayerGroupList | LayerList;
} & VisibilityData;

export type LayerList = { [key: string]: LayerData<typeof key> };

export type LayerGroupList<K extends string = string> = {
  [key in K]: LayerGroupData<K>;
};

export type MainLayerGroup = (typeof MAIN_LAYER_GROUPS)[number];
