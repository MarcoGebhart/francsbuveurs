export interface CartItem {
    id: string;
    quantity: number;
    merchandise: {
        id: string;
        title: string;
        image: {
            url: string;
        };
        priceV2: {
            amount: string;
            currencyCode: string;
        }
        product: {
            title: string;
        };
    };  
    
    
}

export interface CartEdge {
    node: CartItem;
}

export interface Cart {
    id: string;
    items: CartItem[];
    cost: {
      subtotalAmount: {
        amount: string;
        currencyCode: string;
      };
      totalAmount: {
        amount: string;
        currencyCode: string;
      };
    };
  }