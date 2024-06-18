import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const res = verifyUserCookie(request);
  if (res) {
    return res;
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*", "/display/:path*"],
};

const verifyUserCookie = async (request: NextRequest) => {
  const userCookie = request.cookies.get("user");
  if (!userCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
};
