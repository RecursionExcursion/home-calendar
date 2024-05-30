"use client";

import Link from "next/link";

export default function DashboardSideBar() {
  return (
    <div className="w-16 h-full bg-gray-900 px-3">
      <div className="flex flex-col gap-20 items-center justify-center h-full">
        <DashboardLink href="/">Home</DashboardLink>
        <DashboardLink href="/dashboard/task">Add Task</DashboardLink>
        <DashboardLink href="/display">Display</DashboardLink>
      </div>
    </div>
  );
}

type DashBoardLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  children: React.ReactNode;
};

const DashboardLink = (props: DashBoardLinkProps) => {
  const { children, href = "/", ...rest } = props;
  return (
    <Link className="text-nowrap -rotate-90" href={href} {...rest}>
      {children}
    </Link>
  );
};
