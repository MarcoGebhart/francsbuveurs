"use client";

import { useCart } from "@/context/CartContext";
import { useCartActions } from "@/hook/useCartActions";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, totalPrice, checkoutUrl, isCartReady } = useCart();
  const {increaseQty, decreaseQty, removeItem} = useCartActions();

  if (!isCartReady) return <p className="p-6">Ton panier se charge 🍺</p>;
  

  return (
    <div className=" flex flex-col text-black items-center rounded-2xl p-8  md:w-1/2 md:m-auto">
      <h1 className="text-4xl m-10">Mon Panier</h1>
      <ul className="flex flex-col gap-2 w-full">
        {cartItems.map((item) => (
          <li key={item.id} className="relative h-[140] flex items-center border-b border-orange-500 gap-4">
            <div className="flex items-center m-2 ">
                <Image src={item.merchandise.image.url} alt={item.merchandise.title} width={80} height={80} />
                 
            </div>
            <div className="flex flex-col text-sm md:flex-row md:items-center md:gap-10">
                <p>{item.merchandise.product?.title}</p>
                <p>{item.merchandise.priceV2.amount} {item.merchandise.priceV2.currencyCode}</p> 
                <div className="flex items-center justify-between border rounded-4xl mt-2">
                  <span className="text-xl p-4">{item.quantity}</span>
                  <div className="flex gap-2 m-2">
                      <button
                          onClick={() => increaseQty(item)}
                          className="px-3 py-1 text-xl text-bold border rounded-full"
                          >
                          +
                      </button>
                      <button
                          onClick={() => decreaseQty(item)}
                          className="px-3 py-1 border rounded-full text-xl text-bold "
                          >
                          -
                      </button>    
                  </div>  
                </div>   
            </div>
            
            
            <button  className="absolute text-xs -top-0 -right-0 m-1 border border-orange-500 rounded-full px-2 py-1" onClick={() => removeItem(item)}>X</button>
            
            
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <p className=" bg-orange-300 text-end text-xl pt-4 border-b pb-4 pr-2">Total : {totalPrice?.amount} {totalPrice?.currencyCode}</p>
        <p className="mt-2">Montant minimun de commande : 30 €</p>
        <p>Taxes incluses. Frais de port calculés à l&apos;étape de paiement</p>
        
        <button>
          <Link
          href={checkoutUrl ?? "#"}
          className="mt-6 inline-block border border-orange-500 hover:bg-orange-500 p-4 rounded-full"
            >PAIEMENT
          </Link>
        </button> 
        
        <Link href={"/boutique"}>
          <p className="hover:text-orange-500 mt-2">Poursuivre mes achats ?</p>
        </Link>
      </div>
    </div>
  );
}
