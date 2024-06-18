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
      <div className="db-layout-container">
        <DashboardSideBar />
        <div className="greedy-container row-container relative">
          <DashboardProvider>
            <LoadingProvider>{children}</LoadingProvider>
          </DashboardProvider>
        </div>
      </div>
    </UserProvider>
  );
}
