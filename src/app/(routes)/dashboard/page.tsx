import Link from "next/link";
import NewTaskInterface from "./_components/NewTaskInterface";

export default function DashBoardHome() {
  return (
    <div>
      <>DashBoardHome</>
      <Link href={"/display"}>Display</Link>
      <NewTaskInterface />
    </div>
  );
}
