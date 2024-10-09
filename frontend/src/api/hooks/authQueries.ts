import { LoginParams, RegisterParams } from "@api/types";
import { pocketBase } from "@lib/pocketbase";
import { useMutation } from "@tanstack/react-query";

//#region useLogin
const login = async ({ name, password }: LoginParams) => {
  const response = pocketBase
    .collection("users")
    .authWithPassword(name, password);
  console.log({ response });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
//#endregion

//#region useLogout
//#endregion

//#region useRegister
const register = async ({ name, password }: RegisterParams) => {
  // const response = pocketBase
  //   .collection("users")
  //   .authWithPassword(name, password);
  // console.log({ response });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};
//#endregion
