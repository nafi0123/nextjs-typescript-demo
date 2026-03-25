export default function Loading() {
  return (
    <div className="bg-[#F5F0E5] min-h-screen py-10 md:py-20 animate-pulse">
      <div className="max-w-6xl mx-auto px-6 space-y-16">

        {/* Page Title */}
        <div className="h-10 w-48 bg-slate-300 rounded-sm" />

        {/* Profile Section Skeleton */}
        <div className="space-y-10 mb-20">
          <div className="h-6 w-52 bg-slate-200 rounded-sm mb-6" /> {/* Section title */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {/* Full Name */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-200 rounded-sm" /> {/* Label */}
              <div className="h-10 w-full bg-slate-300 rounded-sm" /> {/* Input */}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-200 rounded-sm" />
              <div className="h-10 w-full bg-slate-300 rounded-sm" /> {/* Disabled input */}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-200 rounded-sm" />
              <div className="h-10 w-full bg-slate-300 rounded-sm" />
            </div>

            {/* Update Button */}
            <div className="md:col-span-2 pt-4">
              <div className="h-12 w-48 bg-black rounded-sm" />
            </div>
          </div>
        </div>

        {/* Password Section Skeleton */}
        <div className="space-y-10 border-t border-slate-200 pt-16">
          <div className="h-6 w-52 bg-slate-200 rounded-sm mb-6" /> {/* Section title */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-full bg-slate-200 rounded-sm" /> {/* Label */}
                <div className="h-10 w-full bg-slate-300 rounded-sm" /> {/* Input */}
              </div>
            ))}
            {/* Change Password Button */}
            <div className="md:col-span-3 pt-4">
              <div className="h-12 w-48 bg-black rounded-sm" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}