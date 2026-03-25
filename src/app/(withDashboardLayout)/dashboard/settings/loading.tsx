export default function Loading() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-white p-8 border border-[#EBE3D9] flex flex-col md:flex-row items-center gap-6 shadow-sm justify-between">
        
        <div className="flex items-center gap-4">
          <div className="bg-slate-200 p-4 rounded-sm w-14 h-14 animate-pulse" />
          
          <div className="space-y-2">
            <div className="h-5 w-48 bg-slate-200 animate-pulse" />
            <div className="h-2 w-56 bg-slate-200 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#FAF5F0] border border-[#EBE3D9] p-8 h-full space-y-6">

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse" />
              <div className="h-3 w-32 bg-slate-200 animate-pulse" />
            </div>

            <div className="space-y-2">
              <div className="h-2 w-28 bg-slate-200 animate-pulse" />
              <div className="h-3 w-40 bg-slate-200 animate-pulse" />
            </div>

            <div className="h-6 w-28 bg-slate-200 animate-pulse" />
          </div>

          <div className="h-3 w-full bg-slate-200 animate-pulse" />
        </div>

        {/* Right Form */}
        <div className="lg:col-span-8 bg-white border border-[#EBE3D9] p-8 space-y-6">

          {/* Input Fields */}
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-2 w-32 bg-slate-200 animate-pulse" />
              <div className="h-10 w-full bg-slate-200 animate-pulse" />
            </div>
          ))}

          {/* Button */}
          <div className="h-10 w-40 bg-slate-200 animate-pulse" />

        </div>

      </div>
    </div>
  );
}