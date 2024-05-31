"use client";

import Link from "next/link";
import NewTaskInterface from "./NewTaskInterface";

export default function DashBoard() {
  return (
    <div className="flex flex-col gap-4 items-center p-10">
      <>DashBoardHome</>
      <Link className="text-blue-500 underline" href={"/display"}>
        Display
      </Link>
      <NewTaskInterface />
    </div>
  );
}
