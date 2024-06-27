import { DashboardProvider } from "../../contexts";
import { UserContentProvider } from "../../contexts/UserContentProvider";
import { LoadingProvider } from "../../contexts/LoadingContext";
import DashboardSlideOutMenu from "../../components/dashboard/menu/DashboardSlideOutMenu";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props;
  return (
    <UserContentProvider>
      <div className="db-layout-container">
        <DashboardSlideOutMenu />
        <div className="full flex relative">
          <DashboardProvider>
            <LoadingProvider>{children}</LoadingProvider>
          </DashboardProvider>
        </div>
      </div>
    </UserContentProvider>
  );
}
