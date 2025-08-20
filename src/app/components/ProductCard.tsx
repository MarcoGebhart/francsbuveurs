// components/ProductCard.jsx
'use client';

import { Product } from "@/@types/Product";
import Image from "next/image";
import { useState } from "react";
import Basket from "../../../public/ajouter-au-panier.png"
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface IProduct{
    product: Product,
}

export default function ProductCard({ product }: IProduct) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, checkoutUrl, cartItems } = useCart();

  const handleAddToCart = async() => {
    const variantId = product.variants[0].id; // Assurez-vous d'avoir l'ID de la variante
        if (variantId) {
            await addToCart(variantId, quantity);
            console.log(`Produit ajouté au panier : }${product.title}`,{quantity});
        }
  };

  return (
    
    <div className="  p-4 text-center rounded-lg shadow-md">
      <Link href={`/boutique/${product.handle}`}>
        <Image
          src={product.images[0]?.url}
          alt={product.images[0]?.altText || product.title}
          width={300}
          height={300}
          className="object-cover w-full mb-4 rounded-md"
        />
        <h2 className="text-2xl">{product.title}</h2>
        <p>
        {product.variants[0]?.price && (
        <>
        {product.variants[0].price.amount}{" "}
        {product.variants[0].price.currencyCode}
        </>
        )}
        </p>
      </Link>
        <div className="flex items-center justify-center gap-2">
            {/* Le compteur */}
            <div className="flex items-center justify-between mt-4  border rounded-4xl ">
              <span className="text-xl p-4">{quantity}</span>
              <div className="flex gap-2 m-2">
                  <button
                      onClick={() => setQuantity(prev => prev + 1)}
                       className="px-3 py-1 text-xl text-bold border rounded-full"
                      >
                      +
                  </button>
                  <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                       className="px-3 py-1 border rounded-full text-xl text-bold "
                      >
                      -
                  </button>
              </div>
            </div>
            {/* Le bouton Panier */}
            <button
                onClick={handleAddToCart}
                  className=" p-4 mt-4 transition-colors duration-200 border rounded-full hover:bg-orange-500"
                >
                <Image
                    src={Basket}
                    alt="Panier de bière"
                    width={24}
                    height={24}
                    className=""
                />
            </button>    
        </div> 
        <div className="m-8">
          {/* Bouton de paiement, visible uniquement si le panier a des articles */}
            {checkoutUrl && cartItems.length > 0 && (
                  <a
                      href={checkoutUrl}
                        className=" border rounded-full p-4 hover:bg-orange-400 transition-colors"
                      >
                      PAIEMENT
                  </a>
            )}
        </div>
    </div>
  );
}