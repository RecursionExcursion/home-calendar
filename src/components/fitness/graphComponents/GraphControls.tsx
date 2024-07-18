import { ControlState } from "../types";
import Counter from "./Counter";

type GraphControlProps = ControlState & {};

export const GraphControls = (props: GraphControlProps) => {
  const { divisor, setDivisor, slice, setSlice } = props;

  return (
    <div className="graph-controls">
      <div className="control-container">
        <label htmlFor="divisor">Divisor:</label>
        <Counter num={divisor} setNum={setDivisor} min={1} max={5} />
      </div>
      <div className="control-container">
        <label htmlFor="slice">Slice:</label>
        <Counter num={slice} setNum={setSlice} min={1} />
      </div>
    </div>
  );
};
