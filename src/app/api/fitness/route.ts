// controller, api routes
import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "../apiUtil";
import { getAllFitnessData, saveFitness } from "./fitnessServiceApi";

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

  const res = await getAllFitnessData(userId);

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

  const fitness = await request.json();

  if (!fitness) {
    return new Response(null, {
      status: 400,
      statusText: "fitness not found",
    });
  }

  const res = await saveFitness(fitness);

  const resJson = JSON.stringify(res);

  return new NextResponse(resJson, {
    status: 200,
  });
}
