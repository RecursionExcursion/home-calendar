"use server";

import LoginUI from "../../components/login/LoginUI";
import { deleteUserCookie, getUserCookie } from "../../lib/cookieManager";
import { serverRedirect } from "../../lib/serverActions";
import { validateClientSessionCookie } from "../../service/sessionService";

export default async function LoginPage() {
  //TODO would like this to be in the middleware, temp solution
  // const cookie = await getUserCookie();
  // if (cookie) {
  //   const validation = await validateClientSessionCookie(cookie);
  //   if (!!validation) {
  //     await serverRedirect("/dashboard");
  //   } else {
  //     await deleteUserCookie();
  //   }
  // }

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
