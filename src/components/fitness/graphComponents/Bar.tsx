import { RunnningWorkout, StatRange, StatSum } from "@/types/fitness";
import { CSSProperties } from "react";

const dataTypeLookup = {
  heartRate: (data: RunnningWorkout) => {
    return data?.heartRate?.average ?? "0";
  },
  runningSpeed: (data: RunnningWorkout) => {
    return data?.runningSpeed?.average ?? "0";
  },
  distance: (data: RunnningWorkout) => {
    return data?.distance?.sum ?? "0";
  },
  basalEnergyBurned: (data: RunnningWorkout) => {
    return data?.basalEnergyBurned?.sum ?? "0";
  },
  activeEnergyBurned: (data: RunnningWorkout) => {
    return data?.activeEnergyBurned?.sum ?? "0";
  },
  stepCount: (data: RunnningWorkout) => {
    return data?.stepCount?.sum ?? "0";
  },
};

type BarProps = {
  data: RunnningWorkout;
  ceiling: number;
  dataType: keyof typeof dataTypeLookup;
  className: string;
};

const Bar = (props: BarProps) => {
  const { ceiling, data, dataType, className } = props;
  const valueString = dataTypeLookup[dataType](data);
  let value = 0;

  if (valueString) {
    value = parseFloat(valueString);
  }

  const height = (value / ceiling) * 100;


  const roundedValue =
    dataType == "distance" ? value.toFixed(2) : value.toFixed(0);
  return (
    <div className="bar">
      <div
        className={`bar-value ${className}`}
        style={{ "--bar-height": `${height}%` } as CSSProperties}
      >
        <div className="label">{roundedValue}</div>
      </div>
      
    </div>
  );
};

export default Bar;
