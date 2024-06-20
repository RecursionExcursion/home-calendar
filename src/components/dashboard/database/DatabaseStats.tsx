"use client";

import { Document } from "mongodb";
import { StatSpan } from "./StatSpan";
import { useState } from "react";
import { ConversionIndex, conversionTable } from "../../../lib/byteConverter";

type DatabaseManagerProps = {
  stats: Document;
};

export default function DatabaseStats(props: DatabaseManagerProps) {
  const { stats } = props;

  const [targetConversion, setTargetConversion] = useState<ConversionIndex>("mb");

  return (
    <div className="db-db-container">
      <div className="db-db-stat-selector-container">
        <select
        className="db-db-stat-selector"
          value={targetConversion}
          onChange={(e) => {
            setTargetConversion(e.target.value as ConversionIndex);
          }}
        >
          {Object.keys(conversionTable).map((conversion, index) => {
            return (
              <option key={index} value={conversion}>
                {conversion.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
      <div className="db-db-stat-container">
        <div className="db-db-stat-section-wrapper">
          <div className="db-db-stat-section">
            <StatSpan
              label="Storage Size"
              stat={stats.storageSize}
              targetSize={targetConversion}
            />
            <StatSpan
              label="Data Size"
              stat={stats.dataSize}
              targetSize={targetConversion}
            />
          </div>
          <div className="db-db-stat-section">
            <StatSpan
              label="Index Size"
              stat={stats.indexSize}
              targetSize={targetConversion}
            />
            <StatSpan
              label="Total Size"
              stat={stats.totalSize}
              targetSize={targetConversion}
            />
          </div>
        </div>
        <div className="db-db-stat-section-wrapper">
          <StatSpan
            label="FS Used Size"
            stat={stats.fsUsedSize}
            targetSize={targetConversion}
          />
          <StatSpan
            label="FS Total Size"
            stat={stats.fsTotalSize}
            targetSize={targetConversion}
          />
        </div>
      </div>
    </div>
  );
}
