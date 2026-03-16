import { getHomeRecentProducts } from "@/services/recentHome.service";
import Link from "next/link";
import Image from "next/image"; 
import Container from "../shared/Container";

const NewArrival = async () => {
    const products = await getHomeRecentProducts();

    return (
        <section className="py-12 md:py-20 lg:py-24">
            <Container>
                <div className="px-4 sm:px-6 md:px-0">
                    
                    {/* Section Header */}
                    <div className="mb-10 md:mb-14 lg:mb-16">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-800 uppercase tracking-tighter italic">
                            New Arrive
                        </h2>
                        <div className="h-[2px] w-12 bg-black mt-3" />
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
                        {products?.map((item: any) => (
                            <Link 
                                key={item._id} 
                                href={`/collections/${item._id}`} 
                                className="group block space-y-4"
                            >
                                {/* Image Container */}
                                <div className="aspect-square bg-[#F5F5F5] overflow-hidden relative transition-all duration-500 group-hover:shadow-md">
                                    <Image 
                                        src={item.image} 
                                        alt={item.name}
                                        fill 
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                        className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                                        priority={false}
                                    />

                                    {/* Out of Stock Badge: স্টক ০ হলে দেখাবে */}
                                    {item.stock === 0 && (
                                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
                                            <span className="bg-black text-white text-[10px] md:text-xs font-black uppercase px-3 py-1.5 tracking-widest shadow-xl">
                                                Out of Stock
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Info Section */}
                                <div className="space-y-1 px-1">
                                    <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                        {item.category}
                                    </p>
                                    
                                    <h3 className="text-xs md:text-base font-extrabold text-slate-800 group-hover:text-black transition-colors line-clamp-1 uppercase">
                                        {item.name}
                                    </h3>
                                    
                                    <p className="text-lg md:text-2xl font-black text-slate-900 pt-1">
                                        ৳{item.price}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Empty State */}
                    {(!products || products.length === 0) && (
                        <div className="text-center py-20 border border-dashed border-slate-200">
                            <p className="uppercase font-black text-slate-300 tracking-[0.4em] text-[10px]">
                                No New Arrivals Found
                            </p>
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default NewArrival;