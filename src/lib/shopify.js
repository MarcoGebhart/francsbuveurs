// Fichier: lib/shopify.js

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch({ query, variables = {} }) {
  try {
    const response = await fetch(`https://${domain}/api/2024-07/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      // Ajoute la stratégie de cache de Next.js.
      // Ici, cela signifie que la page sera statique (SSG).
      cache: 'force-cache',
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("HTTP Error:", response.status, response.statusText);
      return { data: null };
    }

    if (data.errors) {
      console.error("GraphQL Errors:", data.errors);
      return { data: null };
    }

    return data;

  } catch (error) {
    console.error("Network or JSON parsing error:", error);
    return { data: null };
  }
}
