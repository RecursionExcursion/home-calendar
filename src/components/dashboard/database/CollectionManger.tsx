"use client";

export type CollectionInfo = {
  name: string;
  count: number;
};

type CollectionManagerProps = {
  collections: CollectionInfo[];
};

export default function CollectionManager(props: CollectionManagerProps) {
  const { collections } = props;
  return (
    <div>
      {collections.map((collection, i) => (
        <span key={collection.name + i}>{collection.name}</span>
      ))}
    </div>
  );
}
