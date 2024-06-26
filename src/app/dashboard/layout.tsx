import DashboardSideBar from "../../components/dashboard/DashboardSideBar";
import { DashboardProvider } from "../../contexts";
import { UserContentProvider } from "../../contexts/UserContentProvider";
import { LoadingProvider } from "../../contexts/LoadingContext";
import { UserProvider } from "../../contexts/UserContext";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props;
  return (
    <UserContentProvider>
      <div className="db-layout-container">
        <DashboardSideBar />
        <div className="full flex relative">
          <DashboardProvider>
            <LoadingProvider>{children}</LoadingProvider>
          </DashboardProvider>
        </div>
      </div>
    </UserContentProvider>
  );
}
