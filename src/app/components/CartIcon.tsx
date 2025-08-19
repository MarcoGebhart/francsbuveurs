"use client";

import { useCart } from "@/context/CartContext"; // Ton contexte Shopify
import Image from "next/image";
import Link from "next/link";
import Basket from "../../../public/ajouter-au-panier.png"

export const CartIcon = () => {
    const { totalItems, checkoutUrl } = useCart();

    return (
        <Link href={checkoutUrl ?? "#"} className="relative">
            <Image
                src={Basket}
                alt="Panier de bière"
                width={24}
                height={24}
                 className=""
            />
            
            {totalItems > 0 && (
                <span className="absolute -top-2 -right-2  bg-orange-500 text-xs  w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                </span>
            )}
        </Link>
    );
};