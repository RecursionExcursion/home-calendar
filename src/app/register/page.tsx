"use server";

import { redirect } from "next/navigation";
import NewUserUI from "../../components/register/NewUserUI";
import { getEnvRegistration } from "../../lib/envManager";

export default async function RegisterPage() {
  const regBool = await getEnvRegistration();
  if (!regBool) {
    redirect("/not_found");
  }

  return <NewUserUI />;
}
