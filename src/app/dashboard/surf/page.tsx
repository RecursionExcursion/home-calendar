"use server";

import ClientSideLoadState from "../../../components/misc/ClientLoadState";
import SurfUI from "../../../components/surf/SurfUI";

export default async function SurfPage() {
  return (
    <div className="db-vert-grid">
      <div className="db-vert-grid-card-1">
        <SurfUI />
        <ClientSideLoadState />
      </div>
    </div>
  );
}
