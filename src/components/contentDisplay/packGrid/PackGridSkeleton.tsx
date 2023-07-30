import PackCardSkeleton from "../packCard/PackCardSkeleton";

export default function PackGridSkeleton() {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(22rem,1fr))] gap-4 mt-10 animate-fade">
      {Array.from(Array(8), (_, i) => (
        <PackCardSkeleton key={i} />
      ))}
    </section>
  );
}
