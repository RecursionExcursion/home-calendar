"use server";

import DashBoard from "../../components/dashboard/DashBoard";
import { UserProvider } from "../../contexts/UserContext";

export default async function DashBoardHome() {
  return (
    <UserProvider>
      <DashBoard />
    </UserProvider>
  );
}
