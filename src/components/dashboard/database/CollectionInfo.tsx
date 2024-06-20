import { byteConverter } from "../../../lib/byteConverter";
import { toFixedAndLocale } from "../../../lib/util";
import { capitalizeFirstLetter } from "../../../util";
import { CollectionData } from "./types";

type CollectionInfoProps = {
  data: CollectionData;
};

export const CollectionInfo = (props: CollectionInfoProps) => {
  const { data } = props;

  const formattedName = capitalizeFirstLetter(data.name);

  const totalSize = toFixedAndLocale(
    byteConverter({
      from: "b",
      to: "kb",
      num: data.stats.totalSize,
    }),
    2
  );

  const totalIndexSize = toFixedAndLocale(
    byteConverter({
      from: "b",
      to: "kb",
      num: data.stats.totalIndexSize,
    }),
    2
  );

  return (
    <div className="db-db-collection-info-wrapper full">
      <div className="db-db-collection-info-grid">
        <div className="flex-w">
          <h4>{formattedName}</h4>
        </div>
        <div className="flex-col-w">
          <span>Documents</span>
          <span>{data.count}</span>
        </div>
        <div className="flex-col-w">
          <span>Total Index Size</span>
          <span>{totalIndexSize} kb</span>
        </div>
        <div className="flex-col-w">
          <span>Total Size</span>
          <span>{totalSize} kb</span>
        </div>
      </div>
    </div>
  );
};
