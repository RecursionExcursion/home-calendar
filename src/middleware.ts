import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const routes = {
    dashboard: request.nextUrl.pathname.startsWith("/dashboard"),
    display: request.nextUrl.pathname.startsWith("/display"),
    login: request.nextUrl.pathname.startsWith("/login"),
    register: request.nextUrl.pathname.startsWith("/register"),
  };

  /* Protected by cookie auth */
  if (routes.dashboard || routes.display) {
    const cookieIsValid = await verifyUserCookie(request);
    if (!cookieIsValid) {
      return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
    }
  }

  return NextResponse.next();
};

const verifyUserCookie = async (request: NextRequest) => {
  const cookie = request.cookies.get("user");

  if (!cookie) return false;

  const resp = await fetch(`${request.nextUrl.origin}/api/auth`, {
    method: "POST",
    body: JSON.stringify(cookie.value),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const status = resp.status;

  return status === 200;
};
