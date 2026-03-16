import { getSingleProduct } from "@/services/recentHome.service";
import Container from "@/components/shared/Container";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react"; 
import AddToCartButton from "../_components/AddToCartButton"; 

interface IProductDetailsProps {
    params: Promise<{ id: string }>;
}

const ProductDetailsPage = async ({ params }: IProductDetailsProps) => {
    const { id } = await params;
    
    const product = await getSingleProduct(id);

    if (!product) {
        return notFound(); 
    }

    return (
        <section className="py-10 md:py-24 bg-white overflow-hidden">
            <Container>
                {/* মোবাইলে দুই পাশে প্যাডিং নিশ্চিত করতে px-4 sm:px-6 অ্যাড করা হয়েছে */}
                <div className="px-4 sm:px-6 md:px-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center">
                        
                        {/* ইমেজ কন্টেইনার - মোবাইলে সাইজ অ্যাডজাস্ট করা হয়েছে */}
                        <div className="aspect-square bg-[#F5F5F5] relative overflow-hidden flex items-center justify-center p-8 md:p-12 rounded-sm shadow-sm">
                            <Image 
                                src={product.image} 
                                alt={product.name} 
                                fill 
                                className="object-contain mix-blend-multiply p-6 md:p-8 hover:scale-105 transition-transform duration-700"
                                priority 
                            />
                        </div>

                        <div className="space-y-6 md:space-y-8">
                            
                            {/* ১. ক্যাটাগরি, নাম এবং প্রাইস */}
                            <div className="space-y-4 pt-4 md:pt-10 border-t-2 md:border-t-0 border-[#EBE3D9]">
                                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#A38A6F]">
                                    {product.category}
                                </p>
                                
                                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none italic text-black">
                                    {product.name}
                                </h1>
                                
                                <p className="text-3xl md:text-5xl font-black text-slate-900 pt-1 md:pt-3">
                                    ${product.price}
                                </p>
                            </div>

                            {/* ২. ডেসক্রিপশন এবং স্টক */}
                            <div className="pt-6 md:pt-8 border-t border-[#EBE3D9]">
                                <div className="flex justify-between items-center mb-4 md:mb-5">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</h4>
                                    <span className="text-[9px] md:text-[10px] font-bold text-orange-600 uppercase bg-orange-50 px-2 py-1 rounded-sm">
                                        Only {product.stock} items left
                                    </span>
                                </div>
                                
                                <p className="text-slate-500 leading-relaxed max-w-lg text-sm md:text-base font-medium">
                                    {product.description}
                                </p>
                            </div>

                            {/* ৩. 'Add To Cart' বাটন */}
                            <div className="pt-6 border-t-2 md:border-t-0 border-[#EBE3D9]">
                                <AddToCartButton 
                                    productId={product._id}
                                    productName={product.name}
                                    productImage={product.image}
                                    productPrice={product.price}
                                    productStock={product?.stock} 
                                />
                            </div>

                            {/* ৪. ← Back to Gallery */}
                            <div className="pt-8 md:pt-10 border-t border-slate-100 flex items-center">
                                <Link href="/" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-black transition-colors">
                                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    Back to Home Catalog
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ProductDetailsPage;