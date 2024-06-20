import {
  ByteConverterParams,
  ConversionIndex,
  byteConverter,
} from "../../../lib/byteConverter";

type StatSpanProps = {
  label: string;
  stat: number;
  fromSize?: ConversionIndex;
  targetSize?: ConversionIndex;
};

export const StatSpan = (props: StatSpanProps) => {
  const { label, stat, fromSize = "b", targetSize = "mb" } = props;

  const params: ByteConverterParams = {
    from: fromSize,
    to: targetSize,
    num: stat,
  };

  let fixed = 0;
  switch (targetSize) {
    case "kb":
      fixed = 2;
      break;
    case "mb":
      fixed = 4;
      break;
    case "gb":
      fixed = 6;
      break;
    case "tb":
      fixed = 8;
      break;
    default:
      break;
  }

  const convertedStats = byteConverter(params).toFixed(fixed);

  return (
    <span className="db-db-stat-span">
      {label}: {convertedStats} {targetSize.toUpperCase()}
    </span>
  );
};
