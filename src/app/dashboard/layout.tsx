import { DashboardProvider } from "../../contexts";
import { ContentProvider } from "../../contexts/UserContentContext";
import DashboardSlideOutMenu from "../../components/dashboard/menu/DashboardSlideOutMenu";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props;
  return (
    <ContentProvider>
      <div className="db-layout-container">
        <DashboardSlideOutMenu />
        <div className="full flex relative">
          <DashboardProvider>{children}</DashboardProvider>
        </div>
      </div>
    </ContentProvider>
  );
}
