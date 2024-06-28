import DeleteTasksAfterMenu from "../../../components/dashboard/settings/DeleteTasksAfterMenu";
import WeatherOptionsMenu from "../../../components/dashboard/settings/WeatherOptionsMenu";
import VerticalGrid from "../../../components/ui/VerticalGrid";

export default async function SettingsPage() {
  return (
    <VerticalGrid>
      <h2 className="db-h2">Settings</h2>
      <WeatherOptionsMenu />
      <DeleteTasksAfterMenu />
    </VerticalGrid>
  );
}
