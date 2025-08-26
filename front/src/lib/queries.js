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
                id
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

export const CREATE_CART = `
  mutation createCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  image {
                    url
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                  product {
                    title
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const ADD_TO_CART = `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  image {
                    url
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                  product {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_CART = `
  query getCart($id: ID!) {
    cart(id: $id) {
      id
      checkoutUrl
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                image {
                  url
                }
                priceV2 {
                  amount
                  currencyCode
                }
                product {
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const UPDATE_CART = `
  mutation updateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  image { url }
                  priceV2 { amount currencyCode }
                  product { title }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const REMOVE_CART_LINE = `
  mutation removeCartLine($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  image { url }
                  priceV2 { amount currencyCode }
                  product { title }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;