import {
  DistanceMeasurement,
  DistanceMeasurementCreateParams,
  DistanceMeasurementUpdateParams,
  User,
} from "@api/types";
import { pocketBase } from "@lib/pocketbase";
import { queryClient } from "@lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@utils/constants";
import { produce } from "immer";

type ProjectIDProp = {
  projectID: string;
};

type MeasurementIDProp = {
  measurementID: string;
};

//#region useGetDistanceMeasurements
const getDistanceMeasurements = async ({ projectID }: ProjectIDProp) => {
  const response = await pocketBase
    .collection("distance_measurements")
    .getFullList({
      filter: `project.id="${projectID}"`,
    });
  return response;
};

export const useGetDistanceMeasurements = ({ projectID }: ProjectIDProp) => {
  return useQuery({
    queryKey: [QUERY_KEYS.distanceMeasurements, projectID],
    queryFn: () => getDistanceMeasurements({ projectID }),
    enabled: Boolean(projectID),
  });
};
//#endregion

//#region useCreateDistanceMeasurement
const createDistanceMeasurement = async ({
  projectID,
  ...data
}: ProjectIDProp & DistanceMeasurementCreateParams) => {
  const response = await pocketBase.collection("distance_measurements").create({
    owner: (pocketBase.authStore.model as User).id,
    project: projectID,
    ...data,
  });
  return response;
};

export const useCreateDistanceMeasurement = () => {
  return useMutation({
    mutationFn: createDistanceMeasurement,
    onSuccess: (response, { projectID }) => {
      queryClient.setQueriesData<DistanceMeasurement[]>(
        {
          queryKey: [QUERY_KEYS.distanceMeasurements, projectID],
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

//#region useUpdateDistanceMeasurement
const updateDistanceMeasurement = async ({
  measurementID,
  ...data
}: MeasurementIDProp & DistanceMeasurementUpdateParams) => {
  const response = await pocketBase
    .collection("distance_measurements")
    .update(measurementID, data);

  return response;
};

export const useUpdateDistanceMeasurement = () => {
  return useMutation({
    mutationFn: updateDistanceMeasurement,
    onSuccess: (response) => {
      queryClient.setQueriesData<DistanceMeasurement[]>(
        {
          queryKey: [QUERY_KEYS.distanceMeasurements, response.project.id],
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

//#region useDeleteDistanceMeasurement
const deleteDistanceMeasurement = async ({
  measurementID,
}: ProjectIDProp & MeasurementIDProp) => {
  const response = await pocketBase
    .collection("distance_measurements")
    .delete(measurementID);
  return response;
};

export const useDeleteDistanceMeasurement = () => {
  return useMutation({
    mutationFn: deleteDistanceMeasurement,
    onSuccess: (_, { measurementID, projectID }) => {
      queryClient.setQueriesData<DistanceMeasurement[]>(
        {
          queryKey: [QUERY_KEYS.distanceMeasurements, projectID],
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
