

import Image from 'next/image';
import { shopifyFetch } from '@/lib/shopify';
import { GET_PRODUCT_BY_HANDLE } from '@/lib/queries'; // <--- Nouvelle requête
import { ProductMetafields } from '@/@types/Product';

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
    const {handle} = await params;
    // Vérifie que le param existe

    const result = await shopifyFetch({
        query: GET_PRODUCT_BY_HANDLE, 
        variables: {handle}, // ✅ on passe bien la valeur à la query
    });
  
    const product = result.data?.productByHandle;
    console.log(product);
    if (!product) {
      return <p>Produit non trouvé.</p>;
    }

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          
            <Image
              key={product.images.edges[0].node.id}
              src={product.images.edges[0].node.url}
              alt={product.images.edges[0].node.altText || product.title}
              width={300}
              height={300}
              className="w-full h-auto object-cover rounded-lg"
            />
          
        </div>
        <div className="w-full md:w-1/2">
            <h1 className="text-3xl mb-4">{product.title}</h1>
            <p className="text-2xl text-orange-500 mb-2">
                {product.variants.edges[0]?.node?.price.amount}{" "}
                {product.variants.edges[0]?.node?.price.currencyCode}
            </p>
            <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} className=" mb-4" />
            {product.metafields.map((metafield: ProductMetafields  ) => (
                <div key={metafield.id} className="mt-4">
                    <h3 className="font-bold text-lg">{metafield.key}: {metafield.value}</h3>
                </div>
            ))}
            <button className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">
            Ajouter au panier
            </button>
        </div>
      </div>
    </div>
  );
}