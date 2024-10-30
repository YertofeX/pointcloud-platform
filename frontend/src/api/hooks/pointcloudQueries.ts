import { PointcloudData, User } from "@api/types";
import { pocketBase } from "@lib/pocketbase";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@utils/constants";

//#region useGetPointclouds
const getPointclouds = async ({projectID}:{projectID: string}): Promise<PointcloudData[]> => {
  const response = pocketBase.collection("pointclouds").getFullList();
  return response;
}

export const useGetPointclouds = ({projectID}: {projectID: string}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.pointclouds, projectID],
    queryFn: ()=>getPointclouds({projectID})
  })
}
//#endregion

//#region useCreatePointcloud
const createPointcloud = async ({
  projectID,
  raw,
  name
}: {
  projectID: string;
  raw: File;
  name: string;
}): Promise<PointcloudData> => {
  const data = new FormData();
  data.append("raw", raw);
  data.append("project", projectID);
  data.append("owner", (pocketBase.authStore.model as User).id);
  data.append("name", name);
  const response = await pocketBase.collection("pointclouds").create(data);
  return response;
};

export const useCreatePointcloud = () => {
  return useMutation({
    mutationFn: createPointcloud,
  });
};
//#endregion
