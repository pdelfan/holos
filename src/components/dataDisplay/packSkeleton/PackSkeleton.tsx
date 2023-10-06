export default function PackSkeleton() {
  return (
    <>
      <div className="bg-gray-200 h-8 w-3/4 rounded-lg animate-pulse dark:bg-neutral-400" />
      <div className="bg-gray-200 h-5 w-1/4 rounded-lg animate-pulse dark:bg-neutral-400 mt-4" />
      <div className="bg-gray-200 grow h-12 rounded-lg animate-pulse dark:bg-neutral-400 mt-6" />
      <div className="flex flex-col gap-3 mt-6">
        <div className="flex flex-col gap-4">
          <div className="bg-gray-200 h-8 w-2/4 rounded-lg animate-pulse dark:bg-neutral-400 mt-6" />
          <div className="bg-gray-200 grow h-64 rounded-lg animate-pulse dark:bg-neutral-400" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-gray-200 h-8 w-2/4 rounded-lg animate-pulse dark:bg-neutral-400 mt-6" />
          <div className="bg-gray-200 grow h-64 rounded-lg animate-pulse dark:bg-neutral-400" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-gray-200 h-8 w-2/4 rounded-lg animate-pulse dark:bg-neutral-400 mt-6" />
          <div className="bg-gray-200 grow h-64 rounded-lg animate-pulse dark:bg-neutral-400" />
        </div>
      </div>
    </>
  );
}
