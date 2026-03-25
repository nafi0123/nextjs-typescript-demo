export default function Loading() {
  return (
    <div className="space-y-16 animate-pulse">

      {/* Banner Skeleton */}
      <div className="relative w-full h-[65vh] md:h-[85vh] bg-slate-300" />

      {/* New Arrival Section */}
      <section className="py-12 md:py-20 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-0">
          <div className="mb-10 md:mb-14 lg:mb-16">
            <div className="h-6 w-44 bg-slate-200 mb-3 rounded-sm" />
            <div className="h-1 w-12 bg-slate-400 rounded-sm" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-square bg-slate-200 rounded-sm" />
                <div className="h-3 w-16 bg-slate-300 rounded-sm" /> {/* category */}
                <div className="h-4 w-24 bg-slate-300 rounded-sm" /> {/* name */}
                <div className="h-5 w-16 bg-slate-400 rounded-sm" /> {/* price */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-12 md:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-0 space-y-4">
          <div className="h-6 w-48 bg-slate-200 rounded-sm" />
          <div className="h-4 w-full bg-slate-200 rounded-sm" />
          <div className="h-4 w-full bg-slate-200 rounded-sm" />
          <div className="h-4 w-3/4 bg-slate-200 rounded-sm" />
        </div>
      </section>

      {/* JustTake Section */}
      <section className="py-12 md:py-20 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-40 bg-slate-200 rounded-sm" />
              <div className="h-4 w-3/4 bg-slate-300 rounded-sm" />
              <div className="h-3 w-1/2 bg-slate-300 rounded-sm" />
            </div>
          ))}
        </div>
      </section>

      {/* JoinCom Section */}
      <section className="py-12 md:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-0 space-y-4">
          <div className="h-6 w-48 bg-slate-200 rounded-sm" />
          <div className="h-4 w-full bg-slate-200 rounded-sm" />
          <div className="h-4 w-5/6 bg-slate-200 rounded-sm" />
          <div className="h-10 w-32 bg-slate-300 rounded-full" />
        </div>
      </section>

    </div>
  )
}