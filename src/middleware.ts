import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const res = await verifyUserCookie(request);
  if (!!res) return res;

  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*", "/display/:path*"],
};

const verifyUserCookie = async (request: NextRequest) => {
  const userCookie = request.cookies.get("user");

  if (userCookie) return await postToAuthApi(request, userCookie);

  return NextResponse.redirect(new URL("/login", request.url));
};

const postToAuthApi = async (request: NextRequest, cookie: RequestCookie) => {
  return await fetch(new URL("/api/auth", request.url), {
    method: "POST",
    body: JSON.stringify(cookie.value),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => {
    return resp.status === 200
      ? null
      : NextResponse.redirect(new URL("/login", request.url));
  });
};
