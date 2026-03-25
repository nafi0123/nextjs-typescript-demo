export default function Loading() {
  return (
    <div className="space-y-8 p-4 md:p-0">

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white p-6 border border-[#EBE3D9] shadow-sm">
        
        <div className="flex items-center gap-4">
          <div className="bg-slate-200 p-3 rounded-sm w-10 h-10 animate-pulse" />
          
          <div className="space-y-2">
            <div className="h-4 w-40 bg-slate-200 animate-pulse" />
            <div className="h-2 w-48 bg-slate-200 animate-pulse" />
          </div>
        </div>

        {/* Search */}
        <div className="w-full md:w-72 h-10 bg-slate-200 animate-pulse" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-sm border border-[#EBE3D9] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            
            {/* Header */}
            <thead>
              <tr className="bg-[#FEF4EC] border-b border-[#EBE3D9]">
                {Array(6).fill(0).map((_, i) => (
                  <th key={i} className="px-6 py-4">
                    <div className="h-3 w-20 bg-slate-200 animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-[#F0F0F0]">
              {Array(10).fill(0).map((_, i) => (
                <tr key={i}>
                  
                  {/* Profile */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 bg-slate-200 rounded-full animate-pulse" />
                      <div className="h-3 w-28 bg-slate-200 animate-pulse" />
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-5">
                    <div className="h-3 w-40 bg-slate-200 animate-pulse" />
                  </td>

                  {/* Created */}
                  <td className="px-6 py-5">
                    <div className="h-3 w-24 bg-slate-200 animate-pulse" />
                  </td>

                  {/* Updated */}
                  <td className="px-6 py-5">
                    <div className="h-3 w-24 bg-slate-200 animate-pulse" />
                  </td>

                  {/* Role */}
                  <td className="px-6 py-5">
                    <div className="h-6 w-20 bg-slate-200 animate-pulse rounded" />
                  </td>

                  {/* Action */}
                  <td className="px-6 py-5 text-right">
                    <div className="h-8 w-16 bg-slate-200 animate-pulse ml-auto" />
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8 pb-10">
        <div className="h-10 w-24 bg-slate-200 animate-pulse" />
        <div className="h-10 w-24 bg-slate-200 animate-pulse" />
        <div className="h-10 w-24 bg-slate-200 animate-pulse" />
      </div>

    </div>
  );
}