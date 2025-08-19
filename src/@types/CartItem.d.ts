export interface CartItem {
    id: string;
    quantity: number;
    merchandise: {
        id: string;
        title: string;
        image: {
            url: string;
        };
    };
}

export interface CartEdge {
    node: CartItem;
}