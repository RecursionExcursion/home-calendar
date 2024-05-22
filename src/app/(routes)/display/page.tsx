import MonthView from "../../_components/calendar/Calendar";

export default function HomeDashboard() {
  const date = new Date();

  return (
    <div>
      <MonthView />
    </div>
  );
}
