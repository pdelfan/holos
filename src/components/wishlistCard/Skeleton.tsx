function Skeleton() {
  return (
    <article className="flex flex-col grow basis-[15rem] sm:max-w-[20rem] rounded-2xl border border-1 border-slate-200 bg-white hover:border-slate-30sm max-[400px]:max-w-[30rem] animate-pulse animate-fade-up">
      <div className="bg-gray-300 rounded-t-2xl w-full h-40 animate-pulse" />
      <div className="p-5">
        <div className="flex gap-2 flex-wrap items-center mb-3">
          <div className="bg-gray-300 w-5 h-5 rounded-full animate-pulse" />
          <div className="bg-gray-200 grow h-3 rounded-lg animate-pulse" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className="bg-gray-200 grow h-3 rounded-lg animate-pulse" />
            <div className="bg-gray-200 grow h-3 rounded-lg animate-pulse" />
            <div className="bg-gray-200 grow h-3 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default Skeleton;
