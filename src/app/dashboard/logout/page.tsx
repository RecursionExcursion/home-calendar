"use server";

import LogOutInterface from "../../../components/dashboard/logout/LogoutInterface";
import SessionManagmentUI from "../../../components/dashboard/logout/SessionManagementUI";
import ClientSideLoadState from "../../../components/misc/ClientLoadState";

export default async function LogOutPage() {
  return (
    <div className="db-vert-grid">
      <div className="db-vert-grid-card-1">
        <SessionManagmentUI />
      </div>
      <div className="db-vert-grid-card-2">
        <LogOutInterface />
      </div>
      <ClientSideLoadState />
    </div>
  );
}
