import {
  HeightMeasurement,
  HeightMeasurementCreateParams,
  HeightMeasurementUpdateParams,
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

const heightMeasurementsKey = ({ projectID }: ProjectIDProp) => [
  QUERY_KEYS.heightMeasurements,
  { projectID },
];

//#region useGetHeightMeasurements
const getHeightMeasurements = async ({
  projectID,
}: ProjectIDProp): Promise<HeightMeasurement[]> => {
  const response = await pocketBase
    .collection("height_measurements")
    .getFullList({
      filter: `project.id="${projectID}"`,
    });
  return response;
};

export const useGetHeightMeasurements = ({ projectID }: ProjectIDProp) => {
  return useQuery({
    queryKey: heightMeasurementsKey({ projectID }),
    queryFn: () => getHeightMeasurements({ projectID }),
    enabled: Boolean(projectID),
  });
};
//#endregion

//#region useCreateHeightMeasurement
const createHeightMeasurement = async ({
  projectID,
  ...data
}: ProjectIDProp &
  HeightMeasurementCreateParams): Promise<HeightMeasurement> => {
  const response = await pocketBase.collection("height_measurements").create({
    owner: (pocketBase.authStore.model as User).id,
    project: projectID,
    ...data,
  });
  return response;
};

export const useCreateHeightMeasurement = () => {
  return useMutation({
    mutationFn: createHeightMeasurement,
    onMutate: async ({ projectID, ...data }) => {
      await queryClient.cancelQueries({
        queryKey: heightMeasurementsKey({ projectID }),
      });

      const previousHeightMeasurements = queryClient.getQueryData<
        HeightMeasurement[] | undefined
      >(heightMeasurementsKey({ projectID }));

      queryClient.setQueryData<HeightMeasurement[]>(
        heightMeasurementsKey({ projectID }),
        produce((draft) => {
          const newMeasurement: HeightMeasurement = {
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

      return { previousHeightMeasurements };
    },
    onError: (_, { projectID }, context) => {
      queryClient.setQueryData<HeightMeasurement[]>(
        heightMeasurementsKey({ projectID }),
        context?.previousHeightMeasurements
      );
    },
    onSettled: (_, __, { projectID }) => {
      queryClient.invalidateQueries({
        queryKey: heightMeasurementsKey({ projectID }),
      });
    },
  });
};
//#endregion

//#region useUpdateHeightMeasurement
const updateHeightMeasurement = async ({
  measurementID,
  projectID,
  ...data
}: MeasurementIDProp &
  ProjectIDProp &
  HeightMeasurementUpdateParams): Promise<HeightMeasurement> => {
  const response = await pocketBase
    .collection("height_measurements")
    .update(measurementID, data);
  return response;
};

export const useUpdateHeightMeasurement = () => {
  return useMutation({
    mutationFn: updateHeightMeasurement,
    onMutate: async ({ projectID, measurementID, ...data }) => {
      await queryClient.cancelQueries({
        queryKey: heightMeasurementsKey({ projectID }),
      });

      const previousHeightMeasurements = queryClient.getQueryData<
        HeightMeasurement[] | undefined
      >(heightMeasurementsKey({ projectID }));

      queryClient.setQueryData<HeightMeasurement[]>(
        heightMeasurementsKey({ projectID }),
        produce((draft) => {
          if (draft === undefined) return;
          const index = draft.findIndex(
            (measurement) => measurement.id === measurementID
          );
          if (index < 0) return;
          draft[index] = { ...draft[index], ...data };
        })
      );

      return { previousHeightMeasurements };
    },
    onError: (_, { projectID }, context) => {
      queryClient.setQueryData<HeightMeasurement[]>(
        heightMeasurementsKey({ projectID }),
        context?.previousHeightMeasurements
      );
    },
    onSettled: (_, __, { projectID }) => {
      queryClient.invalidateQueries({
        queryKey: heightMeasurementsKey({ projectID }),
      });
    },
  });
};
//#endregion

//#region useDeleteHeightMeasurement
const deleteHeightMeasurement = async ({
  measurementID,
}: ProjectIDProp & MeasurementIDProp): Promise<boolean> => {
  const response = await pocketBase
    .collection("height_measurements")
    .delete(measurementID);
  return response;
};

export const useDeleteHeightMeasurement = () => {
  return useMutation({
    mutationFn: deleteHeightMeasurement,
    onMutate: async ({ projectID, measurementID }) => {
      await queryClient.cancelQueries({
        queryKey: heightMeasurementsKey({ projectID }),
      });

      const previousHeightMeasurements = queryClient.getQueryData<
        HeightMeasurement[] | undefined
      >(heightMeasurementsKey({ projectID }));

      queryClient.setQueryData<HeightMeasurement[]>(
        heightMeasurementsKey({ projectID }),
        produce((draft) => {
          if (!draft) return;
          const index = draft.findIndex(
            (measurement) => measurement.id === measurementID
          );
          if (index < 0) return;
          draft.splice(index, 1);
        })
      );

      return { previousHeightMeasurements };
    },
    onError: (_, { projectID }, context) => {
      queryClient.setQueryData<HeightMeasurement[]>(
        heightMeasurementsKey({ projectID }),
        context?.previousHeightMeasurements
      );
    },
    onSettled: (_, __, { projectID }) => {
      queryClient.invalidateQueries({
        queryKey: heightMeasurementsKey({ projectID }),
      });
    },
  });
};
//#endregion
