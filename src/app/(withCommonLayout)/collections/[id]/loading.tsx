export default function Loading() {
  return (
    <section className="py-10 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-0 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center">
          
          {/* Image Skeleton */}
          <div className="aspect-square bg-slate-200 rounded-sm animate-pulse" />

          {/* Content Skeleton */}
          <div className="space-y-6 md:space-y-8">

            {/* Category, Name, Price */}
            <div className="space-y-4 pt-4 md:pt-10 border-t-2 md:border-t-0 border-[#EBE3D9]">
              <div className="h-3 w-24 bg-slate-200 animate-pulse" /> {/* category */}
              <div className="h-10 md:h-14 w-3/4 bg-slate-200 animate-pulse" /> {/* name */}
              <div className="h-8 md:h-12 w-1/4 bg-slate-200 animate-pulse" /> {/* price */}
            </div>

            {/* Description + Stock */}
            <div className="pt-6 md:pt-8 border-t border-[#EBE3D9] space-y-4">
              <div className="h-3 w-32 bg-slate-200 animate-pulse" /> {/* description label */}
              <div className="h-24 md:h-32 w-full bg-slate-200 animate-pulse rounded-sm" /> {/* description content */}
              <div className="h-4 w-28 bg-orange-200 animate-pulse rounded-sm" /> {/* stock badge */}
            </div>

            {/* AI Review Insight */}
            <div className="bg-slate-100 border border-slate-200 p-5 my-8 rounded-sm animate-pulse h-24" />

            {/* Add To Cart Button */}
            <div className="h-12 md:h-14 w-40 bg-slate-200 animate-pulse rounded-sm" />

            {/* Back to Catalog Link */}
            <div className="h-4 w-36 bg-slate-200 animate-pulse rounded-sm" />

          </div>
        </div>
      </div>
    </section>
  );
}