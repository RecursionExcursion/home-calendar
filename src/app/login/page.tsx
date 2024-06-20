"use server";

import { redirect } from "next/navigation";
import LoginUI from "../../components/login/LoginUI";
import { getUserCookie } from "../../lib/cookieManager";
import { validateClientSessionCookie } from "../../service/sessionService";

export default async function LoginPage() {
  await checkUserCookie();
  return (
    <div className="full flex">
      <div className="db-vert-grid">
        <div className="db-vert-grid-card-1">
          <LoginUI />
        </div>
      </div>
    </div>
  );
}

const checkUserCookie = async () => {
  const userCookie = await getUserCookie();
  if (!!userCookie) {
    const user = await validateClientSessionCookie(userCookie);
    if (!!user) {
      redirect("/dashboard");
    }
  }
};
