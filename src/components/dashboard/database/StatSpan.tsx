import {
  ByteConverterParams,
  ConversionIndex,
  byteConverter,
} from "../../../lib/byteConverter";
import { shortenNumber, toFixedAndLocale } from "../../../lib/util";

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

  const convertedStats = byteConverter(params);
  const fixedStats = shortenNumber(convertedStats);

  return (
    <div className="flex-col">
      <span className="db-db-stat-span">{label}</span>
      <span className="db-db-stat-span">
        {fixedStats} {targetSize.toUpperCase()}
      </span>
    </div>
  );
};
