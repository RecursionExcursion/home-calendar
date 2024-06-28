import { NextRequest, NextResponse } from "next/server";
import { createNewBudget, getBudget, saveBudget } from "./budgetServiceApi";
import { authenticateRequest } from "../apiUtil";

export async function GET(request: NextRequest) {
  /* Auth */
  const authRes = await authenticateRequest(request);
  if (!authRes.authorized) {
    return authRes.resp;
  }

  const params = request.nextUrl.searchParams;

  const userId = params.get("userId");

  if (!userId) {
    return new Response(null, {
      status: 400,
      statusText: "userId not found",
    });
  }

  const res = await getBudget(userId);

  const resJson = JSON.stringify(res);

  return new NextResponse(resJson, {
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  /* Auth */
  const authRes = await authenticateRequest(request);
  if (!authRes.authorized) {
    return authRes.resp;
  }

  const userId = await request.json();

  if (!userId) {
    return new Response(null, {
      status: 400,
      statusText: "userId not found",
    });
  }

  const res = await createNewBudget(userId);

  const resJson = JSON.stringify(res);

  return new NextResponse(resJson, {
    status: 200,
  });
}
export async function PUT(request: NextRequest) {
  /* Auth */
  const authRes = await authenticateRequest(request);
  if (!authRes.authorized) {
    return authRes.resp;
  }

  const budget = await request.json();

  if (!budget) {
    return new Response(null, {
      status: 400,
      statusText: "budget not found",
    });
  }

  const res = await saveBudget(budget);

  const resJson = JSON.stringify(res);

  return new NextResponse(resJson, {
    status: 200,
  });
}
