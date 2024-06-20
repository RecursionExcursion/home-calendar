import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const routes = {
    dashboard: request.nextUrl.pathname.startsWith("/dashboard"),
    display: request.nextUrl.pathname.startsWith("/display"),
    login: request.nextUrl.pathname.startsWith("/login"),
    register: request.nextUrl.pathname.startsWith("/register"),
  };

  const foo = await fetch(`${request.nextUrl.origin}/api/auth`, {
    next: { revalidate: 0 },
    method: "GET",
  });

  console.log({ foo2: foo.status });

  // const actions = {
  //   verifyUserCookie: async (request: NextRequest) => verifyUserCookie(request),
  // };

  // console.log({ request });
  // console.log({ url: request.url });
  // console.log({ nextUrl: request.nextUrl });
  // console.log({ orgin: request.nextUrl.origin });

  // TODO Currenlty not working, throwing erros upon extending the session from the login page
  // if (routes.login) {
  //   const userCookieIsValid = await actions.verifyUserCookie(request);

  //   if (userCookieIsValid) {
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }
  // }

  /* Protected by cookie auth */
  if (routes.dashboard || routes.display) {
    console.log("Checking user cookie for protected route", request.nextUrl.pathname);

    const userCookieIsValid = await verifyUserCookie(request);

    if (!userCookieIsValid) {
      const url = new URL("/login", request.nextUrl.origin);

      console.log("User validation failed, redirecting to login page", url.toString());

      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
};

// export const config = {
//   matcher: ["/dashboard/:path*", "/display/:path*"],
// };

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// }

const verifyUserCookie = async (request: NextRequest) => {
  const cookie = request.cookies.get("user");

  if (!cookie) return false;

  const url = new URL("/api/auth", request.nextUrl.origin);
  const url2 = `${request.nextUrl.origin}/api/auth`;

  console.log("Verifying user cookie as", url.toString());
  console.log({ cookie });

  const vercelJwt = request.cookies.get("_vercel_jwt");

  const resp = await fetch(url2, {
    next: { revalidate: 0 },
    method: "POST",
    body: JSON.stringify(cookie.value),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // console.log({ body: resp.body });

  const status = resp.status;
  console.log({ respStatus: status });

  // const json = await resp.json();
  // console.log({ json: json });

  return status === 200;
};
