import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const routes = {
    dashboard: request.nextUrl.pathname.startsWith("/dashboard"),
    display: request.nextUrl.pathname.startsWith("/display"),
    login: request.nextUrl.pathname.startsWith("/login"),
    register: request.nextUrl.pathname.startsWith("/register"),
  };

  const actions = {
    verifyUserCookie: async (request: NextRequest) => verifyUserCookie(request),
  };

  if (routes.login) {
    const userCookieIsValid = await actions.verifyUserCookie(request);

    if (userCookieIsValid) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  /* Protected by cookie auth */
  if (routes.dashboard || routes.display) {
    const userCookieIsValid = await actions.verifyUserCookie(request);

    if (!userCookieIsValid) {
      return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
    }
  }

  return NextResponse.next();
};

const verifyUserCookie = async (request: NextRequest) => {
  const cookie = request.cookies.get("user");

  if (!cookie) return false;

  const resp = await fetch(`${request.nextUrl.origin}/api/auth`, {
    next: { revalidate: 0 },
    method: "POST",
    body: JSON.stringify(cookie.value),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const status = resp.status;
  console.log({ respStatus: status });

  return status === 200;
};
