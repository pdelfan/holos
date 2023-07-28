import TripCardSkeleton from "@/components/tripCard/TripCardSkeleton";

export default function TripGridSkeleton() {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-4 mt-10 animate-fade">
      {Array.from(Array(8), (_, i) => (
        <TripCardSkeleton key={i} />
      ))}
    </section>
  );
}
