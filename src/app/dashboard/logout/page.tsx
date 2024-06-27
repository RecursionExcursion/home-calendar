"use server";

import LogOutInterface from "../../../components/dashboard/logout/LogoutInterface";
import ClientLoadState from "../../../components/misc/ClientLoadState";

export default async function LogOutPage() {
  return (
    <div className="db-vert-grid">
      <div className="db-vert-grid-card-1">
        <LogOutInterface />
      </div>
      <ClientLoadState />
    </div>
  );
}
