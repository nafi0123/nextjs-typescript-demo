import Container from "@/components/shared/Container";

export default function Loading() {
  return (
    <div className="space-y-8 p-4 md:p-0 min-h-screen">
      <Container>

        {/* Header */}
        <div className="bg-white p-8 border border-[#EBE3D9] flex flex-col md:flex-row justify-between items-center shadow-sm gap-6 mt-10">
          
          <div className="flex items-center gap-4">
            <div className="bg-slate-200 p-3 rounded-sm animate-pulse w-10 h-10" />
            
            <div className="space-y-2">
              <div className="h-4 w-24 bg-slate-200 animate-pulse" />
              <div className="h-2 w-32 bg-slate-200 animate-pulse" />
            </div>
          </div>

          {/* Search Skeleton */}
          <div className="w-full md:w-96 h-10 bg-slate-200 animate-pulse" />
        </div>

        {/* Table */}
        <div className="bg-white border border-[#EBE3D9] overflow-hidden shadow-sm mt-8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              
              {/* Header */}
              <thead className="bg-[#FEF4EC] border-b border-[#EBE3D9]">
                <tr>
                  {Array(5).fill(0).map((_, i) => (
                    <th key={i} className="px-8 py-5">
                      <div className="h-3 w-20 bg-slate-200 animate-pulse" />
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-slate-100">
                {Array(8).fill(0).map((_, i) => (
                  <tr key={i}>
                    
                    {/* Transaction */}
                    <td className="px-8 py-6">
                      <div className="h-3 w-32 bg-slate-200 animate-pulse" />
                    </td>

                    {/* Customer */}
                    <td className="px-8 py-6 space-y-2">
                      <div className="h-2 w-24 bg-slate-200 animate-pulse" />
                      <div className="h-2 w-32 bg-slate-200 animate-pulse" />
                    </td>

                    {/* Amount */}
                    <td className="px-8 py-6">
                      <div className="h-3 w-16 bg-slate-200 animate-pulse" />
                    </td>

                    {/* Status */}
                    <td className="px-8 py-6">
                      <div className="h-5 w-20 bg-slate-200 animate-pulse rounded-full" />
                    </td>

                    {/* Date */}
                    <td className="px-8 py-6 text-right">
                      <div className="h-3 w-20 bg-slate-200 animate-pulse ml-auto" />
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

      </Container>
    </div>
  );
}