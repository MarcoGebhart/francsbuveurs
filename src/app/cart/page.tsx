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
    <div className="flex flex-col text-black items-center border border-orange-500 rounded-2xl m-8 p-6">
      <h1 className="text-4xl mb-4">Mon Panier</h1>
      <ul className="flex flex-col gap-2 w-full">
        {cartItems.map((item) => (
          <li key={item.id} className="relative flex items-center border gap-8">
            <div className="flex items-center  gap-1">
                <Image src={item.merchandise.image.url} alt={item.merchandise.title} width={80} height={80} />
                <span>{item.merchandise.product?.title}</span>  
            </div>
            <div className="">
                <span>{item.merchandise.priceV2.amount}{item.merchandise.priceV2.currencyCode}</span>    
            </div>
            
            <div className="flex items-center justify-between mt-4  border rounded-4xl ">
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
            <button className="absolute -top-0 -right-0 m-1" onClick={() => removeItem(item)}>X</button>
            
            
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <p className="text-xl">Total : {totalPrice?.amount} {totalPrice?.currencyCode}</p>
        <Link
          href={checkoutUrl ?? "#"}
          className="mt-4 inline-block border border-orange-500 hover:bg-orange-500 p-4 rounded-full"
        >
          PAIEMENT
        </Link>
      </div>
    </div>
  );
}
