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
      <DashboardSlideOutMenu />
      <DashboardProvider>{children}</DashboardProvider>
    </ContentProvider>
  );
}
