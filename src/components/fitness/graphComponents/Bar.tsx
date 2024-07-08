import { RunnningWorkout } from "@/types/fitness";
import { CSSProperties } from "react";

type BarProps = {
  data: RunnningWorkout;
  ceiling: number;
};

const Bar = (props: BarProps) => {
  const { ceiling, data } = props;
  const distanceString = data.distance?.sum;
  let distance = 0;

  if (distanceString) {
    distance = parseFloat(distanceString);
  }

  const height = (distance / ceiling) * 100;

  return (
    <div className="bar">
      <div
        className="bar-value"
        style={{ "--bar-height": `${height}%` } as CSSProperties}
      >
        {distance.toFixed(2)}
      </div>
    </div>
  );
};

export default Bar;
