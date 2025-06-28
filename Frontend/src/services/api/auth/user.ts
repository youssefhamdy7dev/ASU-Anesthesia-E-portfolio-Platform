import Cookies from "js-cookie";
import { axios } from "../config";

export type User = {
  info?: {
    accCreationDate: string;
    birthDate: string;
    email: string;
    username: string;
    gender: string;
    name: string;
    residencyYear: number;
    NID: number;
    supervisor_id: number;
    pending: number;
  };
  access_token?: string;
};

function normalizeUser(userData: User) {
  return {
    info: {
      accCreationDate: userData.info?.accCreationDate,
      birthDate: userData.info?.birthDate,
      email: userData.info?.email,
      username: userData.info?.username,
      gender: userData.info?.gender,
      name: userData.info?.name,
      residencyYear: userData.info?.residencyYear,
      NID: userData.info?.NID,
      supervisor_id: userData.info?.supervisor_id,
      pending: userData.info?.pending,
    },
    access_token: userData.access_token,
  };
}

export class UserAuth {
  public get userInfo(): User | null {
    return Cookies.get("user") && JSON.parse(Cookies.get("user") as string);
  }
  async login(username: string, password: string) {
    return axios
      .post("/auth/login", {
        username,
        password,
      })
      .then((response) => {
        const user = normalizeUser(response.data);
        Cookies.set("user", JSON.stringify(user));
        return user as User;
      });
  }
  register(data) {
    return axios.post("/auth/register", data).then((data) => data.data);
  }
  async getMe() {
    return axios
      .get("/auth/user")
      .then((res) =>
        normalizeUser({
          access_token: this.userInfo?.access_token,
          info: res.data,
        }),
      )
      .catch((e) => {
        if (e.code !== "ERR_NETWORK") {
          return false;
        }
      });
  }
  refresh(user) {
    Cookies.set("user", JSON.stringify(normalizeUser(user)));
  }
  async logout() {
    Cookies.remove("user");
    if (this.userInfo?.info) {
      axios.post(`/auth/logout`);
    }
  }
}
