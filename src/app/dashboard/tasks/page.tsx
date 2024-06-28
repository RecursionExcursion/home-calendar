"use server";

import NewTaskInterface from "../../../components/dashboard/task/NewTaskInterface";
import ClientSideLoadState from "../../../components/misc/ClientLoadState";
import VerticalGrid from "../../../components/ui/VerticalGrid";

export default async function NewTaskPage() {
  return (
    <>
      <VerticalGrid>
        <NewTaskInterface />
      </VerticalGrid>
      <ClientSideLoadState />
    </>
  );
}
