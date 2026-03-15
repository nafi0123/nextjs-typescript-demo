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
    
    // ডাটা নিয়ে আসা (আপনার দেওয়া অবজেক্টটি এখান থেকে আসবে)
    const product = await getSingleProduct(id);

    if (!product) {
        return notFound(); 
    }

    return (
        <section className="py-12 md:py-24 bg-white">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    
                    {/* ইমেজ কন্টেইনার - ডাটাবেস থেকে আসা URL (Cloudinary) ব্যবহার করবে */}
                    <div className="aspect-square bg-[#F5F5F5] relative overflow-hidden flex items-center justify-center p-12">
                        <Image 
                            src={product.image} // "https://res.cloudinary.com/..."
                            alt={product.name} 
                            fill 
                            className="object-contain mix-blend-multiply p-8"
                            priority 
                        />
                    </div>

                    <div className="space-y-8 px-2">
                        
                        {/* ১. ক্যাটাগরি, নাম এবং প্রাইস */}
                        <div className="space-y-4 pt-10 border-t-2 md:border-t-0 border-[#EBE3D9]">
                            {/* Category: "FRAGRANCE" */}
                            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#A38A6F] mb-4">
                                {product.category}
                            </p>
                            
                            {/* Name: "EE" */}
                            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none italic text-black">
                                {product.name}
                            </h1>
                            
                            {/* Price: 22 */}
                            <p className="text-4xl md:text-5xl font-black text-slate-900 pt-3">
                                ${product.price}
                            </p>
                        </div>

                        {/* ২. ডেসক্রিপশন এবং স্টক */}
                        <div className="pt-8 border-t border-[#EBE3D9]">
                            <div className="flex justify-between items-center mb-5">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</h4>
                                {/* Stock: 3 */}
                                <span className="text-[10px] font-bold text-orange-600 uppercase bg-orange-50 px-2 py-1">
                                    Only {product.stock} items left
                                </span>
                            </div>
                            
                            {/* Description: "33" */}
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
                            />
                        </div>

                        {/* ৪. ← Back to Gallery */}
                        <div className="pt-10 border-t border-slate-100 flex items-center">
                            <Link href="/" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-black transition-colors">
                                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                ← Back to Home Catalog
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ProductDetailsPage;