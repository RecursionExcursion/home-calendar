"use server";

import LoginUI from "../../components/login/LoginUI";

export default async function LoginPage() {
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
