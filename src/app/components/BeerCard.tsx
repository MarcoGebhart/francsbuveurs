// components/BeerCard.tsx
'use client'
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ProductMetafields } from '@/@types/Product';
import Image from 'next/image';
import Basket from "../../../public/ajouter-au-panier.png";

interface BeerCardProps {
    product: {
        images: {
            edges: { node: { id: string; url: string; altText: string } }[];
        };
        title: string;
        descriptionHtml: string;
        variants: {
            edges: { node: { id: string, price: { amount: string; currencyCode: string } } }[];
        };
        metafields: ProductMetafields[];
    };
}

const keyLabels: { [key: string]: string } = {
    createur_de_l_etiquette: "Créateur de l'étiquette :",
    contenance: "Contenance :",
    alc_vol: "Vol d'alc : ",
    plats_d_accompagnement: "Plats d'accompagnement :",
    musique_d_accompagnement: "Musique d'accompagnement :",
};

export function BeerCard({ product }: BeerCardProps) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart, checkoutUrl, isCartReady, cartItems } = useCart();
    
    const handleAddToCart = async() => {
        const variantId = product.variants.edges[0]?.node?.id; // Assurez-vous d'avoir l'ID de la variante
        if (variantId) {
            await addToCart(variantId, quantity);
            console.log(`Produit ajouté au panier : ${product.title}`,{quantity}, {variantId});
        }
    };
    if (!product) {
        return <p>Produit non trouvé.</p>;
    }

    return (
        <div className="container mx-auto p-8 md:w-screen">
            <div className="flex flex-col md:flex-row gap-8 text-black">
                <div className="w-full md:w-1/2">
                    <Image
                        key={product.images.edges[0].node.id}
                        src={product.images.edges[0].node.url}
                        alt={product.images.edges[0].node.altText || product.title}
                        width={300}
                        height={300}
                        className="w-full lg:w-1/2 object-cover rounded-lg"
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl mb-4">{product.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} className=" mb-4" />
                    <p className="text-2xl mb-2">
                        Prix : <span className='text-orange-500'>{product.variants.edges[0]?.node?.price.amount}{" "}
                        {product.variants.edges[0]?.node?.price.currencyCode}</span>
                    </p>
                    {product.metafields.map((metafield: ProductMetafields) => {
                        const displayKey = keyLabels[metafield.key] || metafield.key;
                        const formattedValue = metafield.key === "contenance" ? `${metafield.value} cl` :
                       metafield.key === "alc_vol" ? `${metafield.value} %` :
                       metafield.value;
                        return (
                            <div key={metafield.id} className="mt-2">
                                <h3 className="text-lg">
                                    {displayKey} <span className='text-orange-500'>{formattedValue}</span>
                                </h3>
                            </div>
                        );
                    })}
                    <div className="flex items-center  gap-2 mt-8">
                        {/* Le compteur */}
                        <div className="flex items-center justify-between mt-4  border rounded-4xl">
                        <span className="text-xl p-6">{quantity}</span>
                            <div className="flex gap-2 m-2">
                                <button
                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                    className="px-3 py-1 border rounded-full text-xl text-bold "
                                    >
                                    -
                                </button>
                                <button
                                    onClick={() => setQuantity(prev => prev + 1)}
                                    className="px-3 py-1 text-xl text-bold border rounded-full"
                                    >
                                    +
                                </button>
                            </div>
                        </div>
                        {/* Le bouton Panier */}
                        <button
                            onClick={handleAddToCart}
                            className=" px-4 py-4 mt-4 transition-colors duration-200 border rounded-full hover:bg-orange-400"
                            disabled={!isCartReady} // <-- Désactive le bouton si `isCartReady` est false
                            style={{ opacity: isCartReady ? 1 : 0.5, cursor: isCartReady ? 'pointer' : 'not-allowed' }}
                            >
                            <Image
                                src={Basket}
                                alt="Panier de bière"
                                width={24}
                                height={24}
                                className=""
                            />
                        </button>
                        {/* Bouton de paiement, visible uniquement si le panier a des articles */}
                        {checkoutUrl && cartItems.length > 0 && (
                            <a
                                href={checkoutUrl}
                                className="px-6 py-3 mt-4 border rounded-full  hover:bg-orange-400 transition-colors"
                            >
                                Paiement
                            </a>
                        )}
                    </div> 
                </div>
            </div>
        </div>
    );
}