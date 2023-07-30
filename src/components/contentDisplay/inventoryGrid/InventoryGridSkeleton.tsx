import InventoryCardSkeleton from "@/components/contentDisplay/inventoryCard/InventoryCardSkeleton";

export default function InventoryGridSkeleton() {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 mt-10 animate-fade">
      {Array.from(Array(8), (_, i) => (
        <InventoryCardSkeleton key={i} />
      ))}
    </section>
  );
}
