import $axios from "axios";
import { getAuthorizationHeader } from "@/src/utils/getAuthorizationHeader";
import { AdminAuth } from "../auth/admin";
import { UserAuth } from "../auth/user";
import { url } from "./api";

export const auth = {
  user: new UserAuth(),
  admin: new AdminAuth(),
};
export const axios = $axios.create({
  baseURL: url,
  timeout: 30000,
  timeoutErrorMessage: "Time out!",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...getAuthorizationHeader(),
  },
});
export { url };
