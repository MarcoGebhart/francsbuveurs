// Fichier : src/@types/Product.ts

// Fichier : src/@types/Product.ts

// Interfaces pour la structure de l'API Shopify
export interface ShopifyImageNode {
    node: {
      url: string;
      altText?: string;
    };
  }
  
  export interface ShopifyVariantNode {
    node: {
      price: {
        amount: string;
        currencyCode: string;
      };
    };
  }
  export interface ShopifyMetafieldsNode {
    node: {
      metafield: {
        namespace: string;
        key: string;
        value: string;
        type: string;
      }
    }
  }
  
  export interface ShopifyProductNode {
    node: {
      id: string;
      title: string;
      description: string;
      handle: string;
      images: {
        edges: ShopifyImageNode[];
      };
      variants: {
        edges: ShopifyVariantNode[];
      };
      metafields: {
        edges: ShopifyMetafieldsNode[];
      }
    };
  }
  
  // Interface de la réponse complète de l'API
  export interface ShopifyResponse {
    data: {
      products: {
        edges: ShopifyProductNode[];
      };
    };
  }
  
  // Interfaces aplaties pour l'utilisation dans le composant
  export interface ProductImage {
    url: string;
    altText?: string;
  }
  
  export interface ProductPrice {
    amount: string;
    currencyCode: string;
  }
  
  export interface ProductVariant {
    price: ProductPrice;
  }

  export interface ProductMetafields {
    id: string;
    namespace: string;
    key: string;
    value: string;
    type: string;
  }
  
  export interface Product {
    id: string;
    title: string;
    description: string;
    handle: string;
    images: ProductImage[];
    variants: ProductVariant[];
    metafields: ProductMetafields[];
  }