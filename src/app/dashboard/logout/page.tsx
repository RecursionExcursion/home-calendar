"use server";

import LogOutInterface from "../../../components/dashboard/logout/LogoutInterface";
import SessionManagmentUI from "../../../components/dashboard/logout/SessionManagementUI";
import VerticalGrid from "../../../components/ui/VerticalGrid";

export default async function LogOutPage() {
  return (
    <VerticalGrid>
      <SessionManagmentUI />
      <LogOutInterface />
    </VerticalGrid>
  );
}
