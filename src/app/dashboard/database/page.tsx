"use server";

import { getMongoConnection } from "../../../db/mongoConnection";
import DatabaseStats from "../../../components/dashboard/database/DatabaseStats";
import CollectionManager, {
  CollectionInfo,
} from "../../../components/dashboard/database/CollectionManger";

export default async function DatabasePage() {
  const db = await getMongoConnection();
  const stats = await db.stats();

  const collectionProms = (await db.collections()).map(async (collection) => ({
    name: collection.collectionName,
    count: await collection.countDocuments(),
  }));

  const collections: CollectionInfo[] = await Promise.all(collectionProms);

  return (
    <div className="db-vert-grid">
      <div className="db-vert-grid-card-1">
        <h2>Database Stats</h2>
        <DatabaseStats stats={stats} />
      </div>
      <div className="db-vert-grid-card-2">
        <h2>Collection Managment</h2>
        <CollectionManager collections={collections} />
      </div>
    </div>
  );
}
