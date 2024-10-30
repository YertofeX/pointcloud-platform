import { ComponentType } from "react";
import { MAIN_LAYER_GROUPS } from "./mainLayerGroups";

type VisibilityData = {
  visible: boolean;
};

export type LayerActionComponentProps<T = any> = {
  id: string;
  title: string;
  visible: boolean;
  forcedInvisible: boolean;
  data: T
};

export type LayerData<K extends string = string, T = any> = {
  id: K;
  title: string;
  data: T;
  ActionComponent?: ComponentType<LayerActionComponentProps>;
} & VisibilityData;

export type LayerGroupData<K extends string = string> = {
  id: K;
  title: string;
  content: LayerGroupList | LayerList;
} & VisibilityData;

export type LayerList<T = any> = { [key: string]: LayerData<typeof key, T> };

export type LayerGroupList<K extends string = string> = {
  [key in K]: LayerGroupData<K>;
};

export type MainLayerGroup = (typeof MAIN_LAYER_GROUPS)[number];
