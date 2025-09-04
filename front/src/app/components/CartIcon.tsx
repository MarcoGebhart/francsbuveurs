"use client";

import { useCart } from "@/context/CartContext"; // Ton contexte Shopify
import Image from "next/image";
import Link from "next/link";
import Basket from "../../../public/panier.png";
import Logout from "../../../public/se-deconnecter.png"
import User from "../../../public/user.png"
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export const CartIcon = () => {
    const router = useRouter();
    const { totalItems } = useCart();
    const [mounted, setMounted] = useState(false);
    const {user, logout} = useAuth();

    useEffect(() => {
        setMounted(true);
    },[]);

    if(!mounted) {
        // ne rien afficher tant que le client n'est pas monté
        return null;
    }

    const handleLogout = async () => {
        await logout();
        router.push('/');
      };

    return (
        <div className="flex justify-end gap-4 text-black bg-white mr-4">
            {user?.role === "admin" &&(
            <div className="hidden md:flex mt-4 mb-0 gap-4">
              <Link href={"/admin"} className="block hover:text-orange-500">ADMIN</Link>
              <Image
                src={Logout}
                alt="se déconnecter"
                width={20}
                height={15}
                onClick={handleLogout}></Image>
              
            </div>
          )}
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
            
                <div className="mt-4 flex justify-end relative">
                <Link href={"/mon-panier"}>  
                    <Image
                            src={Basket}
                            alt="Panier de bière"
                            width={20}
                            height={15}
                        />
                
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-orange-500 text-xs  w-5 h-5 rounded-full flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </Link> 
                </div>   
                
        </div>
    );
};