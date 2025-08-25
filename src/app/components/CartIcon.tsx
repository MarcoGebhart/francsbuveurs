"use client";

import { useCart } from "@/context/CartContext"; // Ton contexte Shopify
import Image from "next/image";
import Link from "next/link";
import Basket from "../../../public/panier.png"
import User from "../../../public/user.png"

export const CartIcon = () => {
    const { totalItems } = useCart();

    return (
        <div className="flex justify-end gap-2 bg-white mr-4">
            <Link href={"https://francsbuveurs.myshopify.com/account"}>
                <Image 
                    src={User}
                    alt= "bouton mon compte"
                    width={20}
                    height={15}
                    className="mt-4 mb-0"
                     >    
                </Image>
            </Link>
            
                <div className="mt-4  flex justify-end relative">
                <Link href={"/mon-panier"}>  
                    <Image
                            src={Basket}
                            alt="Panier de bière"
                            width={20}
                            height={15}
                        />
                </Link>
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-orange-500 text-xs  w-5 h-5 rounded-full flex items-center justify-center">
                            {totalItems}
                        </span>
                    )} 
                </div>   
                
        </div>
    );
};