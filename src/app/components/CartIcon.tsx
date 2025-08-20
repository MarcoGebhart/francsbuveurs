"use client";

import { useCart } from "@/context/CartContext"; // Ton contexte Shopify
import Image from "next/image";
import Link from "next/link";
import Basket from "../../../public/panier.png"

export const CartIcon = () => {
    const { totalItems } = useCart();

    return (
        <div className="flex justify-end shadow-md bg-white">
            <div>

            </div>
            <Link href={"/cart"}>
            <div className="m-4 flex justify-end relative">
               <Image
                    src={Basket}
                    alt="Panier de bière"
                    width={24}
                    height={24}
                />
                {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-xs  w-5 h-5 rounded-full flex items-center justify-center">
                        {totalItems}
                    </span>
                )} 
            </div>
                
            </Link>
        </div>
    );
};