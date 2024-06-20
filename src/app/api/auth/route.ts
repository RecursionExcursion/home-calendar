import { validateClientSessionCookie } from "../../../service/sessionService";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {}

export async function POST(request: Request) {
  console.log("POST /api/auth");

  const cookieData = await request.json();

  console.log({ cookieData });

  const user = await validateClientSessionCookie(cookieData);

  const isValid = !!user ? true : false;

  console.log("User is valid: ", isValid);

  return new Response(null, {
    status: isValid ? 200 : 401,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PUT(request: Request) {}
export async function PATCH(request: Request) {}
