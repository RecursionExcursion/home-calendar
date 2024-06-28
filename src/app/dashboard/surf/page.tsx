"use server";

import SurfUI from "../../../components/surf/SurfUI";
import VerticalGrid from "../../../components/ui/VerticalGrid";

export default async function SurfPage() {
  return (
    <VerticalGrid>
      <SurfUI />
    </VerticalGrid>
  );
}
