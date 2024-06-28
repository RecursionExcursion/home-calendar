import { NextRequest, NextResponse } from "next/server";
import { createNewTasks, getUserTasks, saveTasks } from "./taskServiceApi";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const userId = params.get("userId");

  if (!userId) {
    return new NextResponse(null, {
      status: 400,
      statusText: "userId not found",
    });
  }

  const userTasksJson = await getUserTasks(userId);

  return new NextResponse(userTasksJson, {
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  const { userId } = await request.json();

  if (!userId) {
    return new NextResponse(null, {
      status: 400,
      statusText: "userId not found",
    });
  }

  const res = await createNewTasks(userId);

  return new NextResponse(JSON.stringify(res), {
    status: 200,
  });
}

export async function PUT(request: NextRequest) {
  const tasks = await request.json();

  if (!tasks) {
    return new NextResponse(null, {
      status: 400,
      statusText: "tasks not found",
    });
  }

  const res = await saveTasks(tasks);

  return new NextResponse(JSON.stringify(res), {
    status: 200,
  });
}
