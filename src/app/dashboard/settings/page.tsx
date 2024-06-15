"use server";

import DeleteTasksAfterMenu from "../../../components/dashboard/settings/DeleteTasksAfterMenu";
import WeatherOptionsMenu from "../../../components/dashboard/settings/WeatherOptionsMenu";

export default async function SettingsPage() {
  return (
    <div className="col-container gap-1">
      <h2 className="db-h2">Settings</h2>
      <div className="col-container gap-1">
        <WeatherOptionsMenu />
        <DeleteTasksAfterMenu />
      </div>
    </div>
  );
}
