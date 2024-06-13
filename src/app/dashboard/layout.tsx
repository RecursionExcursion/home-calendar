import DashboardSideBar from "../../components/dashboard/DashboardSideBar";
import { DashboardProvider } from "../../contexts";
import { LoadingProvider } from "../../contexts/LoadingContext";
import { UserProvider } from "../../contexts/UserContext";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props;
  return (
    <UserProvider>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <DashboardSideBar />
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <DashboardProvider>
            <LoadingProvider>{children}</LoadingProvider>
          </DashboardProvider>
        </div>
      </div>
    </UserProvider>
  );
}
