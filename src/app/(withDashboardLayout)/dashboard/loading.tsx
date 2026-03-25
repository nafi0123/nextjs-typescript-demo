export default function Loading() {
  return (
    <div className="bg-[#FBF9F6] min-h-screen py-10 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-0 space-y-10">

        {/* Header */}
        <div className="bg-white border border-slate-100 p-8 flex items-center gap-5 shadow-sm">
          <div className="bg-slate-200 p-4 rounded-lg w-16 h-16 animate-pulse" />
          
          <div className="space-y-2">
            <div className="h-6 w-40 bg-slate-200 animate-pulse" />
            <div className="h-3 w-52 bg-slate-200 animate-pulse" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {[1,2,3].map((i) => (
            <div key={i} className="bg-white p-10 border-t-4 border-slate-200 shadow-sm space-y-4">
              <div className="h-3 w-32 bg-slate-200 animate-pulse" />
              <div className="h-10 w-40 bg-slate-200 animate-pulse" />
            </div>
          ))}

        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Area Chart Skeleton */}
          <div className="bg-white p-8 md:p-12 shadow-sm border border-slate-100">
            <div className="h-3 w-40 bg-slate-200 animate-pulse mb-10" />
            
            <div className="h-[350px] w-full flex items-end gap-2">
              {Array(12).fill(0).map((_, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-slate-200 animate-pulse"
                  style={{ height: `${Math.random() * 80 + 20}%` }}
                />
              ))}
            </div>
          </div>

          {/* Bar Chart Skeleton */}
          <div className="bg-white p-8 md:p-12 shadow-sm border border-slate-100">
            <div className="h-3 w-40 bg-slate-200 animate-pulse mb-10" />
            
            <div className="h-[350px] w-full flex items-end gap-4">
              {Array(6).fill(0).map((_, i) => (
                <div 
                  key={i} 
                  className="w-8 bg-slate-200 animate-pulse"
                  style={{ height: `${Math.random() * 80 + 20}%` }}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}