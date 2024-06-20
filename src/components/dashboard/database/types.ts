export type CollectionData = {
  name: string;
  count: number;
  stats: CollectionStats;
};

export type CollectionStats = {
  count: number;
  size: number;
  storageSize: number;
  totalSize: number;
  totalIndexSize: number;
};
