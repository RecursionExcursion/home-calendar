import { validateClientSessionCookie } from "../../../service/sessionService";

export async function GET(request: Request) {}
export async function POST(request: Request) {
  const cookieData = await request.json();

  const user = await validateClientSessionCookie(cookieData);

  const isValid = !!user ? true : false;

  return new Response(null, {
    status: isValid ? 200 : 401,
    statusText: isValid ? "OK" : "User Unauthorized",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PUT(request: Request) {}
export async function PATCH(request: Request) {}
