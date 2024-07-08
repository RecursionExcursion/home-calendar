"use client";

type XAxisProps = {
  ceiling: number;
  divisor: number;
};

const XAxis = (props: XAxisProps) => {
  const { ceiling, divisor } = props;

  const base = ceiling / divisor;
  const tics = [];

  for (let i = 0; i <= divisor; i++) {
    tics.push(i * base);
  }

  return (
    <div className="x-axis">
      {tics.map((e) => {
        return <div className="distance">{e}</div>;
      })}
    </div>
  );
};

export default XAxis;
