import Skeleton from "@/components/wishlistCard/Skeleton";

export default function WishlistGridSkeleton() {  
  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 mt-10 animate-fade">
      {Array.from(Array(8), (_, i) => (
        <Skeleton key={i} />
      ))}
    </section>
  );
}
