import {
  AreaMeasurement,
  AreaMeasurementCreateParams,
  AreaMeasurementUpdateParams,
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

const areaMeasurementsKey = ({ projectID }: ProjectIDProp) => [
  QUERY_KEYS.areaMeasurements,
  { projectID },
];

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
    queryKey: areaMeasurementsKey({ projectID }),
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
    onMutate: async ({ projectID, ...data }) => {
      await queryClient.cancelQueries({
        queryKey: areaMeasurementsKey({ projectID }),
      });

      const previousAreaMeasurements = queryClient.getQueryData<
        AreaMeasurement[] | undefined
      >(areaMeasurementsKey({ projectID }));

      queryClient.setQueryData<AreaMeasurement[]>(
        areaMeasurementsKey({ projectID }),
        produce((draft) => {
          const newMeasurement: AreaMeasurement = {
            id: "-1",
            created: dayjs().toISOString(),
            updated: dayjs().toISOString(),
            owner: (pocketBase.authStore.model as User).id,
            project: projectID ?? "",
            ...data,
          };
          if (draft === undefined) {
            draft = [newMeasurement];
          } else {
            draft.push(newMeasurement);
          }
        })
      );

      return { previousAreaMeasurements };
    },
    onError: (_, { projectID }, context) => {
      queryClient.setQueryData<AreaMeasurement[]>(
        areaMeasurementsKey({ projectID }),
        context?.previousAreaMeasurements
      );
    },
    onSettled: (_, __, { projectID }) => {
      queryClient.invalidateQueries({
        queryKey: areaMeasurementsKey({ projectID }),
      });
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
    onMutate: async ({ projectID, measurementID, ...data }) => {
      await queryClient.cancelQueries({
        queryKey: areaMeasurementsKey({ projectID }),
      });

      const previousAreaMeasurements = queryClient.getQueryData<
        AreaMeasurement[] | undefined
      >(areaMeasurementsKey({ projectID }));

      queryClient.setQueryData<AreaMeasurement[]>(
        areaMeasurementsKey({ projectID }),
        produce((draft) => {
          if (draft === undefined) return;
          const index = draft.findIndex(
            (measurement) => measurement.id === measurementID
          );
          if (index < 0) return;
          draft[index] = { ...draft[index], ...data };
        })
      );

      return { previousAreaMeasurements };
    },
    onError: (_, { projectID }, context) => {
      queryClient.setQueryData<AreaMeasurement[]>(
        areaMeasurementsKey({ projectID }),
        context?.previousAreaMeasurements
      );
    },
    onSettled: (_, __, { projectID }) => {
      queryClient.invalidateQueries({
        queryKey: areaMeasurementsKey({ projectID }),
      });
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
    onMutate: async ({ projectID, measurementID }) => {
      await queryClient.cancelQueries({
        queryKey: areaMeasurementsKey({ projectID }),
      });

      const previousAreaMeasurements = queryClient.getQueryData<
        AreaMeasurement[] | undefined
      >(areaMeasurementsKey({ projectID }));

      queryClient.setQueryData<AreaMeasurement[]>(
        areaMeasurementsKey({ projectID }),
        produce((draft) => {
          if (!draft) return;
          const index = draft.findIndex(
            (measurement) => measurement.id === measurementID
          );
          if (index < 0) return;
          draft.splice(index, 1);
        })
      );

      return { previousAreaMeasurements };
    },
    onError: (_, { projectID }, context) => {
      queryClient.setQueryData<AreaMeasurement[]>(
        areaMeasurementsKey({ projectID }),
        context?.previousAreaMeasurements
      );
    },
    onSettled: (_, __, { projectID }) => {
      queryClient.invalidateQueries({
        queryKey: areaMeasurementsKey({ projectID }),
      });
    },
  });
};
//#endregion
