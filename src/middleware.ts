import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const routes = {
    dashboard: request.nextUrl.pathname.startsWith("/dashboard"),
    display: request.nextUrl.pathname.startsWith("/display"),
    login: request.nextUrl.pathname.startsWith("/login"),
    register: request.nextUrl.pathname.startsWith("/register"),
  };

  const actions = {
    verifyUserCookie: await verifyUserCookie(request),
  };

  if (routes.login) {
    if (actions.verifyUserCookie) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  /* Protected by cookie auth */
  if (routes.dashboard || routes.display) {
    if (!actions.verifyUserCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*", "/display/:path*", "/login"],
};

const verifyUserCookie = async (request: NextRequest) => {
  const cookie = request.cookies.get("user");

  if (!cookie) return false;
  return await fetch(new URL("/api/auth", request.url), {
    method: "POST",
    body: JSON.stringify(cookie.value),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.status === 200);
};
