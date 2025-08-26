'use client';

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { shopifyFetch } from '@/lib/shopify';
import { CREATE_CART, ADD_TO_CART, GET_CART, UPDATE_CART, REMOVE_CART_LINE  } from '@/lib/queries';
import { CartItem, CartEdge } from '@/@types/CartItem';

interface CartContextType {
    cartId: string | null;
    cartItems: CartItem[];
    addToCart: (variantId: string, quantity: number) => Promise<void>;
    updateCartItem: (lineId:string, quantity: number) => Promise<void>;
    removeCartItem: (lineId: string) => Promise<void>;
    checkoutUrl: string | null;
    isCartReady: boolean;
    totalItems: number;
    totalPrice: {
      amount: string;
      currencyCode: string;
    } | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartId, setCartId] = useState<string | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
    const [isCartReady, setIsCartReady] = useState(false);
    const [totalPrice, setTotalPrice] = useState<{ amount: string; currencyCode: string } | null>(null);


    const totalItems = useMemo(()=>{
       return  cartItems.reduce((sum, item) => sum + item.quantity, 0);
    },[cartItems]) 
    
    // 1. Crée un nouveau panier (cart) si aucun n'existe
    useEffect(() => {
        const initCart = async () => {
            const storedCartId = localStorage.getItem('shopify_cart_id');
            console.log("🗂️ Cart ID trouvé en localStorage :", storedCartId);
          
            if (storedCartId) {
              // 🔄 On recharge le panier complet
              const result = await shopifyFetch({
                query: GET_CART,
                variables: { id: storedCartId },
              });
          
              const cart = result.data?.cart;
              console.log("📦 Panier récupéré depuis Shopify :", cart);
          
              if (cart) {
                const cartIdWithKey = cart.id;
                console.log("✅ ID du panier renvoyé par Shopify (GET_CART) :", cartIdWithKey);
          
                setCartId(cartIdWithKey);
                setCheckoutUrl(cart.checkoutUrl);
                setCartItems(cart.lines.edges.map((edge: CartEdge) => edge.node));
                setTotalPrice(cart.cost?.totalAmount ?? null);
                setIsCartReady(true);
          
                // 🔐 On resauvegarde toujours l'ID complet avec la clé
                localStorage.setItem('shopify_cart_id', cartIdWithKey);
                return;
              }
          
              console.warn("⚠️ ID en localStorage invalide, suppression.");
              localStorage.removeItem('shopify_cart_id');
            }
          
            // 🆕 création d’un nouveau panier
            const createRes = await shopifyFetch({
              query: CREATE_CART,
              variables: { input: {} },
            });
          
            const newCart = createRes.data?.cartCreate?.cart;
            console.log("🆕 Nouveau panier créé :", newCart);
          
            if (newCart) {
              const cartIdWithKey = newCart.id;
              console.log("✅ ID du panier renvoyé par Shopify (CREATE_CART) :", cartIdWithKey);
          
              setCartId(cartIdWithKey);
              setCheckoutUrl(newCart.checkoutUrl);
              setCartItems(newCart.lines?.edges?.map((edge: CartEdge) => edge.node) ?? []);
              setTotalPrice(newCart.cost?.totalAmount ?? null);
          
              // 🔐 Sauvegarde l'ID complet avec la clé
              localStorage.setItem('shopify_cart_id', cartIdWithKey);
            }
          
            setIsCartReady(true);
          };
          
      
        initCart();
      }, []);

    // 2. Ajoute des produits au panier
    const addToCart = async (variantId: string, quantity: number) => {
        if (!isCartReady || !cartId) {
          console.error("Erreur : le panier n'est pas encore prêt.");
          return;
        }
      
        // Vérifie si le produit est déjà dans le panier
        const existingLine = cartItems.find(
          (item) => item.merchandise.id === variantId
        );
      
        try {
          let result;
      
          if (existingLine) {
            console.log("🔄 Produit déjà dans le panier → update");
            result = await shopifyFetch({
              query: UPDATE_CART, // 👉 à définir (mutation cartLinesUpdate)
              variables: {
                cartId,
                lines: [
                  {
                    id: existingLine.id, // id de la ligne déjà dans le panier
                    quantity: existingLine.quantity + quantity,
                  },
                ],
              },
            });
          } else {
            console.log("🆕 Nouveau produit → add");
            result = await shopifyFetch({
              query: ADD_TO_CART,
              variables: {
                cartId,
                lines: [{ merchandiseId: variantId, quantity }],
              },
            });
          }
      
          // Vérifie les erreurs retournées
          const userErrors =
            result.data?.cartLinesAdd?.userErrors ||
            result.data?.cartLinesUpdate?.userErrors;
      
          if (userErrors && userErrors.length > 0) {
            console.error("Erreur Shopify :", userErrors);
            return;
          }
      
          // Récupère le panier à jour
          const cart =
            result.data?.cartLinesAdd?.cart || result.data?.cartLinesUpdate?.cart;
      
          if (!cart) {
            console.error("Aucun panier retourné après l'ajout/mise à jour");
            return;
          }
      
          console.log("✅ Panier Shopify :", cart);
      
          // Met à jour l'état local
          const updatedItems = cart.lines.edges.map((edge: CartEdge) => edge.node);
          setCartItems(updatedItems);
          setCheckoutUrl(cart.checkoutUrl);
          setTotalPrice(cart.cost?.totalAmount ?? null);
      
          console.log("Panier mis à jour :", updatedItems);
        } catch (error) {
          console.error("Erreur lors de l'ajout au panier :", error);
        }
      };

      // Modifier la quantité d'un produit
      const updateCartItem = async (lineID: string, quantity: number) => {
        if(!cartId) return;
        const result = await shopifyFetch({
          query: UPDATE_CART,
          variables: {cartId, lines: [{ id: lineID, quantity}]},
        });

        const cart = result.data?.cartLinesUpdate?.cart;
        if (cart) {
          setCartItems(cart.lines.edges.map((edge: CartEdge) => edge.node));
          setTotalPrice(cart.cost?.totalAmount ?? null);
        }
      };

      // Supprimer un produit du panier
      const removeCartItem = async (lineId: string) => {
        if (!cartId) return;
        const result = await shopifyFetch({
          query: REMOVE_CART_LINE, // mutation cartLinesRemove
          variables: { cartId, lineIds: [lineId] },
        });

        const cart = result.data?.cartLinesRemove?.cart;
        if (cart) {
          setCartItems(cart.lines.edges.map((edge: CartEdge) => edge.node));
          setTotalPrice(cart.cost?.totalAmount ?? null);
        }
      };


    return (
        <CartContext.Provider value={{ cartId, cartItems, addToCart, checkoutUrl, isCartReady, totalItems, totalPrice, updateCartItem, removeCartItem }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart doit être utilisé à l\'intérieur d\'un CartProvider');
    }
    return context;
}