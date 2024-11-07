import {
  DistanceMeasurement,
  DistanceMeasurementCreateParams,
  DistanceMeasurementUpdateParams,
  User,
} from "@api/types";
import { dayjs } from "@lib/dayjs";
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

const distanceMeasurementsKey = ({ projectID }: ProjectIDProp) => [
  QUERY_KEYS.distanceMeasurements,
  { projectID },
];

//#region useGetDistanceMeasurements
const getDistanceMeasurements = async ({
  projectID,
}: ProjectIDProp): Promise<DistanceMeasurement[]> => {
  const response = await pocketBase
    .collection("distance_measurements")
    .getFullList({
      filter: `project.id="${projectID}"`,
    });
  return response;
};

export const useGetDistanceMeasurements = ({ projectID }: ProjectIDProp) => {
  return useQuery({
    queryKey: distanceMeasurementsKey({ projectID }),
    queryFn: () => getDistanceMeasurements({ projectID }),
    enabled: Boolean(projectID),
  });
};
//#endregion

//#region useCreateDistanceMeasurement
const createDistanceMeasurement = async ({
  projectID,
  ...data
}: ProjectIDProp &
  DistanceMeasurementCreateParams): Promise<DistanceMeasurement> => {
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
    onMutate: async ({ projectID, ...data }) => {
      await queryClient.cancelQueries({
        queryKey: distanceMeasurementsKey({ projectID }),
      });

      const previousDistanceMeasurements = queryClient.getQueryData<
        DistanceMeasurement[] | undefined
      >(distanceMeasurementsKey({ projectID }));

      queryClient.setQueryData<DistanceMeasurement[]>(
        distanceMeasurementsKey({ projectID }),
        produce((draft) => {
          const newMeasurement: DistanceMeasurement = {
            id: String(Math.random()).split(".")[1],
            created: dayjs().toISOString(),
            updated: dayjs().toISOString(),
            owner: (pocketBase.authStore.model as User).id,
            project: projectID ?? "",
            ...data,
          };
          console.log({ newMeasurement });
          if (draft === undefined) {
            draft = [newMeasurement];
          } else {
            draft.push(newMeasurement);
          }
        })
      );

      return { previousDistanceMeasurements };
    },
    onError: (_, { projectID }, context) => {
      queryClient.setQueryData<DistanceMeasurement[]>(
        distanceMeasurementsKey({ projectID }),
        context?.previousDistanceMeasurements
      );
    },
    onSettled: (_, __, { projectID }) => {
      queryClient.invalidateQueries({
        queryKey: distanceMeasurementsKey({ projectID }),
      });
    },
  });
};
//#endregion

//#region useUpdateDistanceMeasurement
const updateDistanceMeasurement = async ({
  measurementID,
  projectID,
  ...data
}: MeasurementIDProp &
  ProjectIDProp &
  DistanceMeasurementUpdateParams): Promise<DistanceMeasurement> => {
  const response = await pocketBase
    .collection("distance_measurements")
    .update(measurementID, data);
  return response;
};

export const useUpdateDistanceMeasurement = () => {
  return useMutation({
    mutationFn: updateDistanceMeasurement,
    onMutate: async ({ projectID, measurementID, ...data }) => {
      await queryClient.cancelQueries({
        queryKey: distanceMeasurementsKey({ projectID }),
      });

      const previousDistanceMeasurements = queryClient.getQueryData<
        DistanceMeasurement[] | undefined
      >(distanceMeasurementsKey({ projectID }));

      queryClient.setQueryData<DistanceMeasurement[]>(
        distanceMeasurementsKey({ projectID }),
        produce((draft) => {
          if (draft === undefined) return;
          const index = draft.findIndex(
            (measurement) => measurement.id === measurementID
          );
          if (index < 0) return;
          draft[index] = { ...draft[index], ...data };
        })
      );

      return { previousDistanceMeasurements };
    },
    onError: (_, { projectID }, context) => {
      queryClient.setQueryData<DistanceMeasurement[]>(
        distanceMeasurementsKey({ projectID }),
        context?.previousDistanceMeasurements
      );
    },
    onSettled: (_, __, { projectID }) => {
      queryClient.invalidateQueries({
        queryKey: distanceMeasurementsKey({ projectID }),
      });
    },
  });
};
//#endregion

//#region useDeleteDistanceMeasurement
const deleteDistanceMeasurement = async ({
  measurementID,
}: ProjectIDProp & MeasurementIDProp): Promise<boolean> => {
  const response = await pocketBase
    .collection("distance_measurements")
    .delete(measurementID);
  return response;
};

export const useDeleteDistanceMeasurement = () => {
  return useMutation({
    mutationFn: deleteDistanceMeasurement,
    onMutate: async ({ projectID, measurementID }) => {
      await queryClient.cancelQueries({
        queryKey: distanceMeasurementsKey({ projectID }),
      });

      const previousDistanceMeasurements = queryClient.getQueryData<
        DistanceMeasurement[] | undefined
      >(distanceMeasurementsKey({ projectID }));

      queryClient.setQueryData<DistanceMeasurement[]>(
        distanceMeasurementsKey({ projectID }),
        produce((draft) => {
          if (!draft) return;
          const index = draft.findIndex(
            (measurement) => measurement.id === measurementID
          );
          if (index < 0) return;
          draft.splice(index, 1);
        })
      );

      return { previousDistanceMeasurements };
    },
    onError: (_, { projectID }, context) => {
      queryClient.setQueryData<DistanceMeasurement[]>(
        distanceMeasurementsKey({ projectID }),
        context?.previousDistanceMeasurements
      );
    },
    onSettled: (_, __, { projectID }) => {
      queryClient.invalidateQueries({
        queryKey: distanceMeasurementsKey({ projectID }),
      });
    },
  });
};
//#endregion
