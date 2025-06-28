import Cookies from "js-cookie";
import $axios from "axios";
import { url } from "../config";
import { getAuthorizationHeader } from "@/src/utils/getAuthorizationHeader";

export type Admin = {
  info?: {
    name: string;
    username: string;
    email: string;
    accountType: string;
    permission: string | number;
  };
  access_token?: string;
};

function normalizeUser(userData) {
  return {
    info: {
      name: userData.info?.name,
      username: userData.info?.username,
      email: userData.info?.email,
      accountType: userData.info?.accountType,
      permission: userData.info?.permission,
    },
    access_token: userData.access_token,
  };
}

export class AdminAuth {
  public get axios() {
    return $axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthorizationHeader(true),
      },
    });
  }
  public get adminInfo(): Admin | null {
    return Cookies.get("admin") && JSON.parse(Cookies.get("admin") as string);
  }

  async login(username: string, password: string) {
    try {
      const user = normalizeUser(
        (
          await this.axios.post("/admin/login", {
            username,
            password,
          })
        ).data
      );

      Cookies.set("admin", JSON.stringify(user));
      return user as Admin;
    } catch (error) {
      return (error as any).response.data;
    }
  }
  async getMe() {
    return this.axios
      .get("/admin/info")
      .then(({ data }) => {
        return normalizeUser({
          access_token: this.adminInfo?.access_token,
          info: data,
        });
      })
      .catch((e) => {
        if (e.code !== "ERR_NETWORK") {
          return false;
        }
      });
  }
  refresh(user) {
    Cookies.set("admin", JSON.stringify(normalizeUser(user)));
  }
  async logout() {
    Cookies.remove("admin");
    if (this.adminInfo?.info) {
      this.axios.post(`/admin/logout`);
    }
  }
}
