import {
  AreaMeasurement,
  AreaMeasurementCreateParams,
  AreaMeasurementUpdateParams,
  User,
} from "@api/types";
import { pocketBase } from "@lib/pocketbase";
import { queryClient } from "@lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@utils/constants";
import { produce } from "immer";

type ProjectIDProp = {
  projectID?: string;
};

type MeasurementIDProp = {
  measurementID: string;
};

//#region useGetAreaMeasurements
const getAreaMeasurements = async ({
  projectID,
}: ProjectIDProp): Promise<AreaMeasurement[]> => {
  const response = await pocketBase
    .collection("area_measurements")
    .getFullList({
      filter: `project.id="${projectID}"`,
    });
  return response;
};

export const useGetAreaMeasurements = ({ projectID }: ProjectIDProp) => {
  return useQuery({
    queryKey: [QUERY_KEYS.areaMeasurements, projectID],
    queryFn: () => getAreaMeasurements({ projectID }),
    enabled: Boolean(projectID),
  });
};
//#endregion

//#region useCreateAreaMeasurement
const createAreaMeasurement = async ({
  projectID,
  ...data
}: ProjectIDProp & AreaMeasurementCreateParams): Promise<AreaMeasurement> => {
  const response = await pocketBase.collection("area_measurements").create({
    owner: (pocketBase.authStore.model as User).id,
    project: projectID,
    ...data,
  });
  return response;
};

export const useCreateAreaMeasurement = () => {
  return useMutation({
    mutationFn: createAreaMeasurement,
    onSuccess: (response, { projectID }) => {
      queryClient.setQueriesData<AreaMeasurement[]>(
        {
          queryKey: [QUERY_KEYS.areaMeasurements, projectID],
        },
        produce((draft) => {
          if (draft === undefined) {
            draft = [response];
          } else {
            draft.push(response);
          }
        })
      );
    },
  });
};
//#endregion

//#region useUpdateAreaMeasurement
const updateAreaMeasurement = async ({
  measurementID,
  projectID,
  ...data
}: MeasurementIDProp &
  ProjectIDProp &
  AreaMeasurementUpdateParams): Promise<AreaMeasurement> => {
  const response = await pocketBase
    .collection("area_measurements")
    .update(measurementID, data);

  return response;
};

export const useUpdateAreaMeasurement = () => {
  return useMutation({
    mutationFn: updateAreaMeasurement,
    onSuccess: (response, { projectID }) => {
      queryClient.setQueriesData<AreaMeasurement[]>(
        {
          queryKey: [QUERY_KEYS.areaMeasurements, projectID],
        },
        produce((draft) => {
          if (draft === undefined) return;
          const index = draft.findIndex(
            (measurement) => measurement.id === response.id
          );
          if (index < 0) return;
          draft[index] = response;
        })
      );
    },
  });
};
//#endregion

//#region useDeleteAreaMeasurement
const deleteAreaMeasurement = async ({
  measurementID,
}: ProjectIDProp & MeasurementIDProp): Promise<boolean> => {
  const response = await pocketBase
    .collection("area_measurements")
    .delete(measurementID);
  return response;
};

export const useDeleteAreaMeasurement = () => {
  return useMutation({
    mutationFn: deleteAreaMeasurement,
    onSuccess: (_, { measurementID, projectID }) => {
      queryClient.setQueriesData<AreaMeasurement[]>(
        {
          queryKey: [QUERY_KEYS.areaMeasurements, projectID],
        },
        produce((draft) => {
          if (!draft) return;
          const index = draft.findIndex(
            (measurement) => measurement.id === measurementID
          );
          if (index < 0) return;
          draft.splice(index, 1);
        })
      );
    },
  });
};
//#endregion
