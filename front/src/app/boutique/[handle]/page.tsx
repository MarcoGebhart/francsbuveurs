import { shopifyFetch } from '@/lib/shopify';
import { GET_PRODUCT_BY_HANDLE } from '@/lib/queries';
import { BeerCard } from '../../components/BeerCard';

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params;
    
    const result = await shopifyFetch({
        query: GET_PRODUCT_BY_HANDLE,
        variables: { handle },
    });

    const product = result.data?.productByHandle;
    
    if (!product) {
        return <p>Produit non trouvé.</p>;
    }
    
    // On appelle simplement le composant BeerCard et on lui passe le produit
    return <BeerCard product={product} />;
}