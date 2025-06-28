import Cookies from "js-cookie";

export function getAuthorizationHeader(admin = false) {
  if (admin) {
    const adminCookie = Cookies.get("admin"),
      currentUser = (adminCookie && JSON.parse(adminCookie)) || {};

    return {
      Authorization: `Bearer ${currentUser.access_token || ""}`,
    };
  }

  const userCookie = Cookies.get("user"),
    currentUser = (userCookie && JSON.parse(userCookie)) || {};

  return {
    Authorization: `Bearer ${currentUser.access_token || ""}`,
  };
}
