// components/ProductCard.jsx
'use client';

import { Product } from "@/@types/Product";
import Image from "next/image";
import { useState } from "react";
import Basket from "../../../public/ajouter-au-panier.png"
import Link from "next/link";

interface IProduct{
    product: Product,
}

export default function ProductCard({ product }: IProduct) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Logique pour ajouter le produit au panier
    console.log(`Ajouté au panier : ${quantity} x ${product.title}`);
    // Ici, vous ajouteriez la logique réelle pour le panier
  };

  return (
    <Link href={`/boutique/${product.handle}`}>
    <div className="  p-4 text-center rounded-lg shadow-md">
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
      <div className="flex justify-center gap-2">
      {/* Le compteur */}
      <div className="flex items-center justify-between mt-4  border rounded-4xl ">
        <span className="text-xl p-6">{quantity}</span>
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
                className=" px-4 py-2 mt-4 transition-colors duration-200 border rounded-full hover:bg-orange-500"
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
    </div>
    </Link>
  );
}