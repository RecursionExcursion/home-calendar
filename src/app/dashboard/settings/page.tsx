"use server";

import { H2 } from "../../../components/base";
import DeleteTasksAfterMenu from "../../../components/dashboard/settings/DeleteTasksAfterMenu";
import WeatherOptionsMenu from "../../../components/dashboard/settings/WeatherOptionsMenu";

export default async function SettingsPage() {
  return (
    <div className="colContainer" style={{ gap: "1rem" }}>
      <H2>Settings</H2>
      <div
        className="colContainer"
        style={{ alignItems: "start", width: "80%", gap: "1rem" }}
      >
        <WeatherOptionsMenu />
        <DeleteTasksAfterMenu />
      </div>
    </div>
  );
}
