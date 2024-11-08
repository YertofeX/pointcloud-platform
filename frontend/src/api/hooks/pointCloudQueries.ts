import {
  PointCloudCreateparams,
  PointCloudData,
  PointCloudUpdateParams,
  User,
} from "@api/types";
import { pocketBase } from "@lib/pocketbase";
import { queryClient } from "@lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@utils/constants";
import { produce } from "immer";

type PointCloudIDParam = {
  pointCloudID: string;
};

type ProjectIDParam = {
  projectID: string;
};

//#region useGetPointClouds
const getPointClouds = async ({
  projectID,
}: ProjectIDParam): Promise<PointCloudData[]> => {
  const response = pocketBase.collection("pointclouds").getFullList({
    filter: `project.id="${projectID}"`,
  });
  return response;
};

export const useGetPointClouds = ({ projectID }: { projectID: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.pointClouds, projectID],
    queryFn: () => getPointClouds({ projectID }),
    enabled: Boolean(projectID),
  });
};
//#endregion

//#region useCreatePointCloud
const createPointCloud = async ({
  projectID,
  raw,
  name,
  visible,
}: PointCloudCreateparams): Promise<PointCloudData> => {
  const data = new FormData();
  data.append("raw", raw);
  data.append("project", projectID);
  data.append("owner", (pocketBase.authStore.model as User).id);
  data.append("name", name);
  data.append("visible", String(visible));
  const response = await pocketBase.collection("pointclouds").create(data);
  return response;
};

export const useCreatePointcloud = () => {
  return useMutation({
    mutationFn: createPointCloud,
    onSuccess: (response, { projectID }) => {
      queryClient.setQueriesData<PointCloudData[]>(
        { queryKey: [QUERY_KEYS.pointClouds, projectID] },
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

//#region useUpdatePointCloud
const updatePointCloud = async ({
  pointCloudID,
  ...data
}: PointCloudIDParam &
  ProjectIDParam &
  PointCloudUpdateParams): Promise<PointCloudData> => {
  const response = await pocketBase
    .collection("pointclouds")
    .update(pointCloudID, data);
  return response;
};

export const useUpdatePointCloud = () => {
  return useMutation({
    mutationFn: updatePointCloud,
    onSuccess: (response, { projectID }) => {
      queryClient.setQueriesData<PointCloudData[]>(
        {
          queryKey: [QUERY_KEYS.pointClouds, projectID],
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

//#region useDeletePointCloud
const deletePointCloud = async ({
  pointCloudID,
}: PointCloudIDParam & ProjectIDParam): Promise<boolean> => {
  const response = await pocketBase
    .collection("pointclouds")
    .delete(pointCloudID);
  return response;
};

export const useDeletePointCloud = () => {
  return useMutation({
    mutationFn: deletePointCloud,
    onSuccess: (_, { pointCloudID, projectID }) => {
      queryClient.setQueryData<PointCloudData[]>(
        [QUERY_KEYS.pointClouds, projectID],
        produce((draft) => {
          if (!draft) return;
          const index = draft.findIndex(
            (pointCloud) => pointCloud.id === pointCloudID
          );
          if (index < 0) return;
          draft.splice(index, 1);
        })
      );
    },
  });
};
//#endregion
