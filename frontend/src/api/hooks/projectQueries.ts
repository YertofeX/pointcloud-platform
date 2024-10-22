import {
  Project,
  ProjectCreateParams,
  ProjectListFilter,
  ProjectUpdateParams,
  User,
} from "@api/types";
import { pocketBase } from "@lib/pocketbase";
import { queryClient } from "@lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@utils/constants";
import { produce } from "immer";

// #region useGetProjects
const getProjects = async ({
  name,
  onlyFavorite,
  states,
  types,
}: ProjectListFilter): Promise<Project[]> => {
  const filters: string[] = [];
  if (name) filters.push(`name ~ "${name}"`);

  if (onlyFavorite) filters.push("favorite=true");

  if (states && states.length > 0)
    filters.push(`(${states.map((state) => `state="${state}"`).join("||")})`);

  if (types && types.length > 0)
    filters.push(`(${types.map((type) => `type="${type}"`).join("||")})`);

  const response = await pocketBase.collection("projects").getFullList({
    filter: filters.join("&&"),
  });
  return response;
};

export const useGetProjects = ({
  name,
  onlyFavorite,
  states,
  types,
}: ProjectListFilter) => {
  return useQuery({
    queryKey: [QUERY_KEYS.projects, { name, onlyFavorite, states, types }],
    queryFn: () => getProjects({ name, onlyFavorite, states, types }),
  });
};
// #endregion

//#region useGetProject
const getProject = async ({
  projectID,
}: {
  projectID: string;
}): Promise<Project> => {
  const response = await pocketBase.collection("projects").getOne(projectID);
  return response;
};

export const useGetProject = ({ projectID }: { projectID?: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.project, projectID],
    queryFn: () => getProject({ projectID: projectID ?? "" }),
    enabled: Boolean(projectID),
  });
};
//#endregion

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
const updateProject = async (
  data: Omit<ProjectUpdateParams, "owner">
): Promise<Project> => {
  const response = await pocketBase.collection("projects").update(data.id, {
    ...data,
    owner: (pocketBase.authStore.model as User).id,
  });
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

//#region useUpdateProjectThumbnail
const updateProjectThumbnail = async ({
  projectID,
  file,
}: {
  projectID: string;
  file: File;
}): Promise<Project> => {
  const data = new FormData();
  data.append("thumbnail", file);
  const response = await pocketBase
    .collection("projects")
    .update(projectID, data);
  return response;
};

export const useUpdateProjectThumbnail = () => {
  return useMutation({
    mutationFn: updateProjectThumbnail,
    onSuccess: (response) => {
      queryClient.setQueriesData<Project>(
        { queryKey: [QUERY_KEYS.project] },
        response
      );
      queryClient.setQueriesData<Project[]>(
        { queryKey: [QUERY_KEYS.projects] },
        produce((draft) => {
          if (!draft) return;
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

//#region useUpdateProjectFavorite
const updateProjectFavorite = async ({
  projectID,
  favorite,
}: {
  projectID: string;
  favorite: boolean;
}): Promise<Project> => {
  const response = await pocketBase
    .collection("projects")
    .update(projectID, { favorite });
  return response;
};

export const useUpdateProjectFavorite = () => {
  return useMutation({
    mutationFn: updateProjectFavorite,
    onSuccess: (response) => {
      queryClient.setQueriesData<Project>(
        { queryKey: [QUERY_KEYS.project] },
        response
      );
      queryClient.setQueriesData<Project[]>(
        { queryKey: [QUERY_KEYS.projects] },
        produce((draft) => {
          if (!draft) return;
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

//#region useUploadProjectPointcloud
const uploadProjectPointcloud = async ({
  projectID,
  raw,
}: {
  projectID: string;
  raw: File;
}) => {
  const data = new FormData();
  data.append("raw", raw);
  data.append("project", projectID);
  data.append("owner", (pocketBase.authStore.model as User).id);
  const response = await pocketBase.collection("pointclouds").create(data);
  return response;
};

export const useUploadProjectPointcloud = () => {
  return useMutation({
    mutationFn: uploadProjectPointcloud,
  });
};
//#endregion
