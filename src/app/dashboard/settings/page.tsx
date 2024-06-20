"use server";

import DeleteTasksAfterMenu from "../../../components/dashboard/settings/DeleteTasksAfterMenu";
import WeatherOptionsMenu from "../../../components/dashboard/settings/WeatherOptionsMenu";

export default async function SettingsPage() {
  return (
    <div className="db-vert-grid">
      <div className="db-vert-grid-card-1">
        <h2 className="db-h2">Settings</h2>
      </div>
      <div className="db-vert-grid-card-2">
        <WeatherOptionsMenu />
      </div>
      <div className="db-vert-grid-card-3">
        <DeleteTasksAfterMenu />
      </div>
    </div>
  );
}
