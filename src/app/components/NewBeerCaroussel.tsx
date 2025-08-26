"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ShopifyProductNode } from "@/@types/Product";
import { shopifyFetch } from "@/lib/shopify";
import { GET_PRODUCTS_QUERY } from "@/lib/queries";

export default function NewBeerCarousel() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const { data } = await shopifyFetch({
          query: GET_PRODUCTS_QUERY,
        });
        const products: Product[] = data.products.edges.map(({ node }: ShopifyProductNode) => ({
            id: node.id,
            title: node.title,
            handle: node.handle,
            description: node.description,
            images: node.images.edges.map((imgEdge) => imgEdge.node),
            variants: node.variants.edges.map((vEdge) => vEdge.node),
            metafields: node.metafields,
          })) ?? [];
      setProducts(products);
    }
    loadProducts();
  }, []);

  if (products.length === 0) {
    return <p>Chargement...</p>;
  }

   // Séparer mobile et desktop slides (exemple 3 par slide)
   const mobileSlides = products.map((p, idx) => (
    <div key={p.id} id={`m-slide${idx + 1}`} className="carousel-item relative w-full md:hidden">
      <Link href={`/boutique/${p.handle}`}>
        <figure className="card border border-px-2 hover:border-orange-500 w-full">
          <Image
            src={p.images[0].url || "/placeholder.png"}
            alt={p.images[0].altText || p.title}
            width={300}
            height={200}
            className="card w-full h-full object-cover"
            unoptimized
          />
        </figure>
      </Link>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href={`#m-slide${idx === 0 ? products.length : idx}`} className="text-orange-500">❮</a>
        <a href={`#m-slide${idx === products.length - 1 ? 1 : idx + 2}`} className="text-orange-500">❯</a>
      </div>
    </div>
    
  ));

  // Desktop slides (3 produits par slide)
  const chunkSize = 3;
  const desktopSlides = [];
  const totalSlides = Math.ceil(products.length / chunkSize);

  for (let i = 0; i < products.length; i += chunkSize) {
    const chunk = products.slice(i, i + chunkSize);
    const slideIndex = i / chunkSize + 1;
    const prevSlide = slideIndex === 1 ? totalSlides : slideIndex - 1;
    const nextSlide = slideIndex === totalSlides ? 1 : slideIndex + 1;

    desktopSlides.push(
    <div key={i} id={`d-slide${slideIndex}`} className="hidden carousel-item relative md:flex justify-evenly gap-4 w-full m-4">
      {chunk.map(p => (
        <Link key={p.id} href={`/boutique/${p.handle}`}>
          <figure className="card border border-px-2 hover:border-orange-500 w-60">
            <Image
              src={p.images[0].url}
              alt={p.images[0].altText || p.title}
              width={300}
              height={200}
              className="card w-full h-full object-cover"
              unoptimized
            />
          </figure>
        </Link>
      ))}
      {/* Navigation desktop */}
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href={`#d-slide${prevSlide}`} className="text-orange-500">❮</a>
        <a href={`#d-slide${nextSlide}`} className="text-orange-500">❯</a>
      </div>
    </div>
  );
  }

  return (
    <div className="carousel w-1/2 md:w-full mt-4">
      {mobileSlides}
      {desktopSlides}
    </div>
  )
    
}
