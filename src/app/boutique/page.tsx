
import { shopifyFetch } from "../../lib/shopify";
import { GET_PRODUCTS_QUERY } from "../../lib/queries";
import { Product, ShopifyProductNode } from "@/@types/Product";
import ProductCard from "../components/ProductCard";

// Le composant est async, ce qui nous permet d'utiliser 'await'.
export default async function ShopPage() {
  // 1. On récupère les données
  const { data } = await shopifyFetch({
    query: GET_PRODUCTS_QUERY,
  });
  

  // 2. On gère le cas où la requête échoue
  if (!data || !data.products) {
    return <p>Échec du chargement des produits. Veuillez vérifier la configuration de l&apos;API.</p>;
  }

  // 3. On aplatit la structure des données pour un affichage facile
  const products: Product[] = data.products.edges.map(({ node }: ShopifyProductNode) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    images: node.images.edges.map((imgEdge) => imgEdge.node),
    variants: node.variants.edges.map((vEdge) => vEdge.node),
    metafields: node.metafields,
  }));
    
  // 4. On affiche les produits
  return (
    <div className="flex flex-wrap justify-center gap-6 p-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  );
}


