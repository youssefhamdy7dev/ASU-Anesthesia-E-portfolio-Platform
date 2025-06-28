import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  adminAuthRoutes,
  protectedSupervisorRoutes,
  protectedAdminRoutes,
  protectedRoutes,
  userAuthRoutes,
} from "./src/router";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/supervisor")) {
    const adminCookie = request.cookies.get("admin")?.value,
      admin = adminCookie && JSON.parse(adminCookie);

    if (
      !admin &&
      (protectedSupervisorRoutes.includes(`${request.nextUrl.pathname}`) ||
        protectedAdminRoutes.includes(`${request.nextUrl.pathname}`))
    ) {
      const response = NextResponse.redirect(
        new URL("/supervisor/login", request.url)
      );
      response.cookies.delete("admin");
      return response;
    } else {
      if (
        protectedAdminRoutes.includes(`${request.nextUrl.pathname}`) &&
        admin.info.permission === 0
      ) {
        const response = NextResponse.redirect(
          new URL("/supervisor", request.url)
        );
        return response;
      }
    }

    if (adminAuthRoutes.includes(request.nextUrl.pathname) && admin) {
      return NextResponse.redirect(new URL("/supervisor", request.url));
    }
  } else {
    const userCookie = request.cookies.get("user")?.value,
      user = userCookie && JSON.parse(userCookie);
    if (!user && protectedRoutes.includes(request.nextUrl.pathname)) {
      const response = NextResponse.redirect(new URL("/SignIn", request.url));
      response.cookies.delete("user");
      return response;
    }
    if (userAuthRoutes.includes(request.nextUrl.pathname) && user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
