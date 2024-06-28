import { DashboardProvider, UserProvider } from "../../contexts";
import DashboardSlideOutMenu from "../../components/dashboard/menu/DashboardSlideOutMenu";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props;
  return (
    <UserProvider>
      <DashboardSlideOutMenu />
      <DashboardProvider>{children}</DashboardProvider>
    </UserProvider>
  );
}
