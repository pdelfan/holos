export default function WishlistCardSkeleton() {
  return (
    <article className="flex flex-col grow basis-[15rem] rounded-2xl border border-1 border-slate-200 bg-white hover:border-slate-30 max-[400px]:max-w-[30rem] animate-pulse dark:bg-neutral-700 dark:border-neutral-500">
      <div className="bg-gray-300 rounded-t-2xl w-full h-48 animate-pulse dark:bg-neutral-600" />
      <div className="p-5">
        <div className="flex gap-2 flex-wrap items-center mb-3">
          <div className="bg-gray-300 w-5 h-5 rounded-full animate-pulse dark:bg-neutral-400" />
          <div className="bg-gray-200 grow h-3 rounded-lg animate-pulse dark:bg-neutral-400" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className="bg-gray-200 grow h-3 rounded-lg animate-pulse dark:bg-neutral-400" />
            <div className="bg-gray-200 grow h-3 rounded-lg animate-pulse dark:bg-neutral-400" />
            <div className="bg-gray-200 grow h-3 rounded-lg animate-pulse dark:bg-neutral-400" />
          </div>
        </div>
      </div>
    </article>
  );
}
