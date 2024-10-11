import {
  Project,
  ProjectCreateParams,
  ProjectUpdateParams,
  User,
} from "@api/types";
import { pocketBase } from "@lib/pocketbase";
import { queryClient } from "@lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@utils/constants";
import { produce } from "immer";

// #region useGetProjects
const getProjects = async (): Promise<Project[]> => {
  const response = await pocketBase.collection("projects").getFullList();
  return response;
};

export const useGetProjects = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.projects],
    queryFn: getProjects,
  });
};
// #endregion

// #region useCreateProject
const createProject = async (
  data: Omit<ProjectCreateParams, "owner">
): Promise<Project> => {
  const response = await pocketBase
    .collection("projects")
    .create({ ...data, owner: (pocketBase.authStore.model as User).id });
  return response;
};

export const useCreateProject = () => {
  return useMutation({
    mutationFn: createProject,
    onSuccess: (response) => {
      queryClient.setQueriesData<Project>(
        {
          queryKey: [QUERY_KEYS.project, response.id],
        },
        response
      );
      queryClient.setQueriesData<Project[]>(
        { queryKey: [QUERY_KEYS.projects] },
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
// #endregion

//#region useUpdateProject
const updateProject = async (data: ProjectUpdateParams): Promise<Project> => {
  const response = await pocketBase
    .collection("projects")
    .update(data.id, data);
  return response;
};

export const useUpdateProject = () => {
  return useMutation({
    mutationFn: updateProject,
    onSuccess: (response) => {
      queryClient.setQueriesData<Project>(
        { queryKey: [QUERY_KEYS.project, response.id] },
        response
      );
      queryClient.setQueriesData<Project[]>(
        { queryKey: [QUERY_KEYS.projects] },
        produce((draft) => {
          if (draft === undefined) return;
          const index = draft.findIndex(
            (project) => project.id === response.id
          );
          if (index < 0) return;
          draft[index] = response;
        })
      );
    },
  });
};
//#endregion
