'use client';

import { useCart } from "@/context/CartContext";
import { CartItem } from "@/@types/CartItem";

export function useCartActions() {
  const { updateCartItem, removeCartItem } = useCart();

  const increaseQty = (item: CartItem) => {
    updateCartItem(item.id, item.quantity + 1);
  };

  const decreaseQty = (item: CartItem) => {
    if (item.quantity > 1) {
      updateCartItem(item.id, item.quantity - 1);
    } else {
      removeCartItem(item.id); // si quantité tombe à 0 → on supprime
    }
  };

  const removeItem = (item: CartItem) => {
    removeCartItem(item.id);
  };

  return { increaseQty, decreaseQty, removeItem };
}