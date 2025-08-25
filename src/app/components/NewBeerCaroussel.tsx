"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/@types/Product";
import { shopifyFetch } from "@/lib/shopify";
import { GET_PRODUCTS_QUERY } from "@/lib/queries";

export default function NewBeerCarousel() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const { data } = await shopifyFetch({
          query: GET_PRODUCTS_QUERY,
        });
        const formattedProducts = data?.products?.edges?.map((edge: any) => ({
            id: edge.node.id,
            title: edge.node.title,
            images: edge.node.images.edges.map((img: any) => ({
              url: img.node.url,
              altText: img.node.altText,
            })),
          })) ?? [];
      setProducts(formattedProducts);
    }
    loadProducts();
  }, []);

  if (products.length === 0) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="carousel w-1/2 md:w-full mt-4">
      {products.map((product, index) => {
        const image = product.images;
        return (
          <div
            key={product.id}
            id={`slide-${index}`}
            className="carousel-item relative w-full"
          >
            <Link href={`/products/${product.id}`}>
              <figure className="card border hover:border-orange-500 w-full">
                {image && (
                  <Image
                    src={product.images[0].url}
                    alt={product.images[0].altText || product.title}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                )}
              </figure>
            </Link>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 text-orange-500">
              <a href={`#slide-${(index - 1 + products.length) % products.length}`}>
                ❮
              </a>
              <a href={`#slide-${(index + 1) % products.length}`}>❯</a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
