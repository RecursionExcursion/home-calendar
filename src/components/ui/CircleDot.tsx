type CircleDotProps = {
  label: string;
  value: string | number;
  className?: string;
  units?:string;
};

export default function CircleDot(props: CircleDotProps) {
  const { label, value, className = "", units = "" } = props;
  return (
    <div className={`circle-dot ${className}`}>
      <span className="label">{label}: </span>
      <span className="value">{value}{` ${units}`}</span>
    </div>
  );
}
