import { PointCloudData, User } from "@api/types";
import { pocketBase } from "@lib/pocketbase";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@utils/constants";

//#region useGetPointClouds
const getPointClouds = async ({
  projectID,
}: {
  projectID: string;
}): Promise<PointCloudData[]> => {
  const response = pocketBase.collection("pointclouds").getFullList();
  return response;
};

export const useGetPointClouds = ({ projectID }: { projectID: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.pointclouds, projectID],
    queryFn: () => getPointClouds({ projectID }),
  });
};
//#endregion

//#region useCreatePointCloud
const createPointCloud = async ({
  projectID,
  raw,
  name,
  visible,
}: {
  projectID: string;
  raw: File;
  name: string;
  visible: boolean;
}): Promise<PointCloudData> => {
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
  });
};
//#endregion
