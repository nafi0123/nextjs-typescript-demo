"use client";

import { ShoppingCart, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useState } from "react";

interface AddToCartButtonProps {
    productId: string;
    productName: string;
    productImage: string;
    productPrice: number;
}

const AddToCartButton = ({ productId, productName, productImage, productPrice }: AddToCartButtonProps) => {
    const [isAdded, setIsAdded] = useState(false);
    
    const handleAddToCart = () => {
        try {
            const currentCart = JSON.parse(localStorage.getItem("user_cart") || "[]");
            const isExist = currentCart.some((item: any) => item._id === productId);

            if (isExist) {
                toast.error(`${productName} is already in your cart!`, {
                    style: {
                        borderRadius: '0px',
                        background: '#1a1a1a',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        padding: '16px'
                    },
                });
                return;
            }

            const newItem = {
                _id: productId,
                name: productName,
                image: productImage,
                price: productPrice,
                quantity: 1,
                addedAt: new Date().toISOString()
            };

            localStorage.setItem("user_cart", JSON.stringify([...currentCart, newItem]));

            setIsAdded(true);
            toast.success(`${productName} added to cart`, {
                icon: '🛒',
                duration: 3000,
                style: {
                    borderRadius: '0px',
                    background: '#000',
                    color: '#fff',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: '900',
                    padding: '16px'
                },
            });

            setTimeout(() => setIsAdded(false), 2000);

        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <button 
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full md:w-max px-10 py-5 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 ${
                isAdded ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-zinc-800'
            }`}
        >
            {isAdded ? (
                <>
                    <CheckCircle2 size={18} />
                    Added to Cart
                </>
            ) : (
                <>
                    <ShoppingCart size={18} />
                    Add To Cart
                </>
            )}
        </button>
    );
};

export default AddToCartButton;