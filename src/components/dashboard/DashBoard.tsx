"use client";

import NewTaskInterface from "./NewTaskInterface";

export default function DashBoard() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <NewTaskInterface />
    </div>
  );
}
