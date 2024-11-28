export interface CartItem {
    courseId: string;
    title: string;
    price: number;
    thumbnail: string;
}

export interface Cart {
    items: CartItem[];
    total: number;
}