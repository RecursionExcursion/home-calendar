import { NextRequest, NextResponse } from "next/server";
import { createNewUser, getUserById, getUserByName, saveUser } from "./userServiceApi";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const search = params.get("search");
  const searchBy = params.get("searchBy");

  if (!search || !searchBy) {
    return new Response(null, {
      status: 400,
      statusText: "search or searchBy params not found",
    });
  }

  let user = "";
  switch (searchBy) {
    case "id":
      user = await getUserById(search);
      break;
    case "username":
      user = await getUserByName(search);
      break;
  }

  return new NextResponse(user, {
    status: 200,
  });
}
export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return new Response(null, {
      status: 400,
      statusText: "username or password not found",
    });
  }

  const res = await createNewUser(username, password);

  return new NextResponse(res, {
    status: 200,
  });
}

export async function PUT(request: NextRequest) {
  const user = await request.json();

  if (!user) {
    return new Response(null, {
      status: 400,
      statusText: "user not found",
    });
  }

  const res = await saveUser(user);

  return new NextResponse(res, {
    status: 200,
  });
}

export async function PATCH(request: NextRequest) {}
