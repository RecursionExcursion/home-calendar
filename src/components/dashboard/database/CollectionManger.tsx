"use client";

import React from "react";
import { FaTrash } from "react-icons/fa6";
import { dropCollection } from "../../../db/dbManager";
import { CollectionData } from "./types";
import { useDashboardContext } from "../../../contexts";
import { CollectionInfo } from "./CollectionInfo";

type CollectionManagerProps = {
  collectionInfo: CollectionData[];
};

export default function CollectionManager(props: CollectionManagerProps) {
  const { collectionInfo } = props;
  const { showToast } = useDashboardContext();

  const [allowDrop, setAllowDrop] = React.useState(false);

  const dropCollectionClick = async (collectionName: string) => {
    const res = confirm(
      `Are you sure you want to drop '${collectionName}'?\nThis action cannot be undone.`
    );

    if (res) {
      const deleted = await dropCollection(collectionName);
      if (deleted) {
        showToast({
          title: "Collection Dropped",
          message: `Collection '${collectionName}' has been dropped.`,
          type: "success",
        });
      } else {
        showToast({
          title: "Error Dropping Collection",
          message: `An error occurred while dropping '${collectionName}'.`,
          type: "error",
        });
      }
    }
  };

  collectionInfo.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="db-db-collection-wrapper">
      <div className="flex gap-1">
        <h3>Collection Managment</h3>
        <input type="checkbox" onChange={(e) => setAllowDrop(e.target.checked)} />
      </div>
      <div className="db-db-collection-grid">
        {collectionInfo.map((collection, i) => {
          return (
            <React.Fragment key={collection.name + i}>
              <div className="db-db-collection-grid-card">
                <CollectionInfo data={collection} />
              </div>
              <button
                className="db-db-collection-grid-card btn-lite"
                onClick={() => dropCollectionClick(collection.name)}
                disabled={!allowDrop}
              >
                <FaTrash />
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
