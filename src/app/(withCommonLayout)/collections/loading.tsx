import Container from "@/components/shared/Container";

export default function Loading() {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-white">
      <Container>
        <div className="px-4 sm:px-6 md:px-0">

          {/* Header */}
          <div className="mb-10 md:mb-14 lg:mb-16">
            <div className="h-8 w-48 bg-slate-200 animate-pulse" />
            <div className="h-[2px] w-12 bg-slate-200 mt-3 animate-pulse" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="space-y-4">

                {/* Image */}
                <div className="aspect-square bg-[#F5F5F5] animate-pulse" />

                {/* Text */}
                <div className="space-y-2 px-1">
                  <div className="h-2 w-16 bg-slate-200 animate-pulse" />
                  <div className="h-3 w-24 bg-slate-200 animate-pulse" />
                  <div className="h-4 w-20 bg-slate-200 animate-pulse" />
                </div>

              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-20 flex justify-center items-center gap-4">
            <div className="h-8 w-24 bg-slate-200 animate-pulse" />
            <div className="h-4 w-32 bg-slate-200 animate-pulse" />
            <div className="h-8 w-24 bg-slate-200 animate-pulse" />
          </div>

        </div>
      </Container>
    </section>
  );
}