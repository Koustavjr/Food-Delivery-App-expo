import { create } from "zustand";

export type CartItem = {
    id: string;
    name: string
    price: number
    description: string
    category: string
    image: any
    isPopular?: boolean
    isVeg?: boolean,
    quantity: number,
    rating: number,
    time: string,
    restaurantId: string,
    restaurantName: string,
}

export type CartStore = {
    items: CartItem[];
    restaurantId: string | null;
    restaurantName: string | null;
    totalItems: () => number;
    totalPrice: () => number;
    isInCart: (id: string) => boolean;
    getItemQuantity: (id: string) => number;
    addItem: (item: CartItem, restaurantId: string, restaurantName: string) => void;
    removeItem: (itemId: string, restaurantId: string) => void;
    deleteItem: (itemId: string, restaurantId: string) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    restaurantId: null,
    restaurantName: null,

    totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    isInCart: (id) => get().items.some(item => item.id === id),
    getItemQuantity: (id) => get().items.find(item => item.id === id)?.quantity ?? 0,

    addItem: (item, restaurantId, restaurantName) => set((state) => {
        const existing = state.items.find(i => i.id === item.id)
        if (existing) {
            return {
                items: state.items.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            }
        }
        return {
            items: [...state.items, { ...item, quantity: 1, restaurantId, restaurantName }],
            restaurantId,
            restaurantName,
        }
    }),

    removeItem: (itemId, restaurantId) => set((state) => {
        const item = state.items.find(i => i.id === itemId)
        if (!item) return state

        if (item.quantity === 1) {
            const items = state.items.filter(i => i.id !== itemId)
            return {
                items,
                restaurantId: items.length === 0 ? null : state.restaurantId,
                restaurantName: items.length === 0 ? null : state.restaurantName,
            }
        }

        return {
            items: state.items.map(i =>
                i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
            )
        }
    }),

    deleteItem: (itemId, restaurantId) => set((state) => ({
        items: state.items.filter(i => !(i.id === itemId && i.restaurantId === restaurantId))
    })),

    clearCart: () => set({ items: [], restaurantId: null, restaurantName: null }),
}));