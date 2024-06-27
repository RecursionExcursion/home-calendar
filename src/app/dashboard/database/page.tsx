"use server";

import { getMongoConnection } from "../../../db/mongoConnection";
import DatabaseStats from "../../../components/dashboard/database/DatabaseStats";
import CollectionManager from "../../../components/dashboard/database/CollectionManger";
import { CollectionData } from "../../../components/dashboard/database/types";
import ClientLoadState from "../../../components/misc/ClientLoadState";

export default async function DatabasePage() {
  const db = await getMongoConnection();
  const dbStats = await db.stats();

  const collections: CollectionData[] = await Promise.all(
    (
      await db.collections()
    ).map(async (collection) => {
      const collectionName = collection.collectionName;

      const statsDoc = await db.command({ collStats: collectionName });

      return {
        name: collectionName,
        count: await collection.countDocuments(),
        stats: {
          count: statsDoc.count,
          size: statsDoc.size,
          storageSize: statsDoc.storageSize,
          totalSize: statsDoc.totalSize,
          totalIndexSize: statsDoc.totalIndexSize,
        },
      };
    })
  );

  return (
    <div className="db-vert-grid">
      <div className="db-vert-grid-card-1">
        <div className="flex-col full gap-1">
          <h3>Database Stats</h3>
          <DatabaseStats stats={dbStats} />
        </div>
      </div>
      <div className="db-vert-grid-card-2">
        <CollectionManager collectionInfo={collections} />
      </div>
      <ClientLoadState />
    </div>
  );
}
