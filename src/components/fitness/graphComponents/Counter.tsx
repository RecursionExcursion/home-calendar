"use client";

import { Dispatch, SetStateAction } from "react";

type CounterProps = {
  num: number;
  setNum: Dispatch<SetStateAction<number>>;
  min?: number;
  max?: number;
};
const Counter = (props: CounterProps) => {
  const { num, setNum, min = 0, max = Number.MAX_SAFE_INTEGER } = props;
  
  const incNum = () => {
    if (num !== max) setNum((prev) => prev + 1);
  };

  const decNum = () => {
    if (num !== min) setNum((prev) => prev - 1);
  };

  return (
    <div className="fitness-counter">
      <div className="button-container">
        <button className="minus" onClick={decNum}>
          -
        </button>
      </div>
      <span className="value">{num}</span>
      <div className="button-container">
        <button className="plus" onClick={incNum}>
          +
        </button>
      </div>
    </div>
  );
};
export default Counter;
