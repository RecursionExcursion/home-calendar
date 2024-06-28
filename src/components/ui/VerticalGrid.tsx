"use server";

import React, { ReactNode } from "react";
import ClientSideLoadState from "../misc/ClientLoadState";

type VerticalGridProps = {
  children: ReactNode;
};

export default async function VerticalGrid(props: VerticalGridProps) {
  const { children } = props;
  const baseCardStyle = "db-vert-grid-card";

  if (React.Children.count(children) > 4) {
    throw new Error("VerticalGrid only supports up to 4 children");
  }

  return (
    <>
      <div className="db-vert-grid">
        {React.Children.map(children, (child, index) => {
          return <div className={`${baseCardStyle}-${index + 1}`}>{child}</div>;
        })}
      </div>
      <ClientSideLoadState />
    </>
  );
}
