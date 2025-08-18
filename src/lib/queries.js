// Fichier: lib/queries.js

export const GET_PRODUCTS_QUERY = `
  query {
    products(first: 250) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      descriptionHtml
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            price {
              amount
              currencyCode
            }
          }
        }
      }
      metafields(identifiers: [
        {namespace: "custom", key: "contenance"},
        {namespace: "custom", key: "alc_vol"},
        {namespace: "custom", key: "createur_de_l_etiquette"},
        {namespace: "custom", key: "plats_d_accompagnement"},
        {namespace: "custom", key: "musique_d_accompagnement"}
      ]) {
        id
        key
        namespace
        value
      }
    }
  }
`;