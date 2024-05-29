"use server";

import { UserProvider } from "../../_contexts/UserContext";
import DashBoard from "../../_components/dashboard/DashBoard";

export default async function DashBoardHome() {
  return (
    <UserProvider>
      <DashBoard />
    </UserProvider>
  );
}
