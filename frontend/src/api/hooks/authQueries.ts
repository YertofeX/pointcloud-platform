import { LoginParams, RegisterParams, User } from "@api/types";
import { pocketBase } from "@lib/pocketbase";
import { queryClient } from "@lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@utils/constants";
import { RecordAuthResponse } from "pocketbase";

//#region useGetUser
const getUser = async (): Promise<User> => {
  const { record } = await pocketBase.collection("users").authRefresh();
  return record;
};

export const useGetUser = (props?: { disabled?: boolean }) => {
  return useQuery({
    queryFn: getUser,
    queryKey: [QUERY_KEYS.user],
    enabled: !props || !props.disabled,
    retry: false,
  });
};
//#endregion

//#region useLogin
const login = async ({
  name,
  password,
}: LoginParams): Promise<RecordAuthResponse<User>> => {
  const response = await pocketBase
    .collection("users")
    .authWithPassword(name, password);
  return response;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
//#endregion

//#region useLogout
const logout = () => {
  pocketBase.authStore.clear();
  queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.user] });
  setTimeout(() => {
    queryClient.clear();
  }, 1000);
};

export const useLogout = () => {
  return { logout };
};
//#endregion

//#region useRegister
const register = async (data: RegisterParams): Promise<User> => {
  const response = await pocketBase.collection("users").create(data);
  return response;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};
//#endregion

//#region useUpdateProfilePicture
const updateProfilePicture = async ({
  userID,
  file,
}: {
  userID: string;
  file: File;
}): Promise<User> => {
  const data = new FormData();
  data.append("avatar", file);
  const response = await pocketBase.collection("users").update(userID, data);
  return response;
};

export const useUpdateProfilePicture = () => {
  return useMutation({
    mutationFn: updateProfilePicture,
    onSuccess: (response) => {
      queryClient.setQueriesData<User>(
        { queryKey: [QUERY_KEYS.user] },
        response
      );
    },
  });
};
//#endregion
