import { getAllCollections } from "@/services/collection.service";
import Container from "@/components/shared/Container";
import Image from "next/image";
import Link from "next/link";

const CollectionPage = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
    // ১. Pagination এর জন্য বর্তমান পেজ নম্বর বের করা
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    
    // ২. ডাটা ফেচ করা (Limit 8)
    const { products, totalPages } = await getAllCollections(currentPage, 8);

    return (
        <section className="py-12 md:py-20 lg:py-24 bg-white">
            <Container>
                <div className="px-4 sm:px-6 md:px-0">
                    
                    {/* Section Header: স্ক্রিনশটের ডিজাইন অনুযায়ী */}
                    <div className="mb-10 md:mb-14 lg:mb-16">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-800 uppercase tracking-tighter italic">
                            Our Collections
                        </h2>
                        <div className="h-[2px] w-12 bg-black mt-3" />
                    </div>

                    {/* Product Grid: আপনার দেওয়া কোড অনুযায়ী */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
                        {products?.map((item: any) => (
                            <Link 
                                key={item._id} 
                                href={`/collections/${item._id}`} // আপনার রিকোয়ারমেন্ট অনুযায়ী
                                className="group block space-y-4"
                            >
                                <div className="aspect-square bg-[#F5F5F5] overflow-hidden relative transition-all duration-500 group-hover:shadow-md">
                                    <Image 
                                        src={item.image} 
                                        alt={item.name}
                                        fill 
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                        className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                <div className="space-y-1 px-1">
                                    <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                        {item.category}
                                    </p>
                                    <h3 className="text-xs md:text-base font-extrabold text-slate-800 group-hover:text-black transition-colors line-clamp-1 uppercase">
                                        {item.name}
                                    </h3>
                                    <p className="text-lg md:text-2xl font-black text-slate-900 pt-1">
                                        ${item.price}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination Section: প্রফেশনাল বাটন ডিজাইন */}
                    {totalPages > 1 && (
                        <div className="mt-20 flex justify-center items-center gap-4">
                            <Link
                                href={`/collections?page=${currentPage - 1}`}
                                className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest border border-slate-200 hover:bg-black hover:text-white transition-all ${currentPage <= 1 ? "pointer-events-none opacity-30" : ""}`}
                            >
                                Previous
                            </Link>
                            
                            <span className="text-xs font-black italic tracking-widest">
                                PAGE {currentPage} OF {totalPages}
                            </span>

                            <Link
                                href={`/collections?page=${currentPage + 1}`}
                                className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest border border-slate-200 hover:bg-black hover:text-white transition-all ${currentPage >= totalPages ? "pointer-events-none opacity-30" : ""}`}
                            >
                                Next
                            </Link>
                        </div>
                    )}

                    {/* Empty State */}
                    {(!products || products.length === 0) && (
                        <div className="text-center py-24 border border-dashed border-slate-200">
                            <p className="uppercase font-black text-slate-300 tracking-[0.4em] text-[10px]">
                                No Products Found In Collections
                            </p>
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default CollectionPage;