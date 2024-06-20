"use server";

import NewTaskInterface from "../../../components/dashboard/task/NewTaskInterface";

export default async function NewTaskPage() {
  return (
    <div className="db-vert-grid">
      <div className="db-vert-grid-card-1">
        <NewTaskInterface />
      </div>
    </div>
  );
}
