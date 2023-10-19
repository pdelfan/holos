import PackCardSkeleton from "../packCard/PackCardSkeleton";

export default function PackGridSkeleton() {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(1fr,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] gap-4 mt-10 animate-fade">
      {Array.from(Array(8), (_, i) => (
        <PackCardSkeleton key={i} />
      ))}
    </section>
  );
}
