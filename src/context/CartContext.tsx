import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '../types/product';

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    total: number;
    itemCount: number;
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: Product }
    | { type: 'REMOVE_ITEM'; payload: number }
    | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
    | { type: 'CLEAR_CART' };

interface CartContextType {
    state: CartState;
    addItem: (product: Product) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find(item => item.product.id === action.payload.id);
            
            if (existingItem) {
                const updatedItems = state.items.map(item =>
                    item.product.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                return calculateTotals({ ...state, items: updatedItems });
            } else {
                const newItems = [...state.items, { product: action.payload, quantity: 1 }];
                return calculateTotals({ ...state, items: newItems });
            }
        }
        
        case 'REMOVE_ITEM': {
            const filteredItems = state.items.filter(item => item.product.id !== action.payload);
            return calculateTotals({ ...state, items: filteredItems });
        }
        
        case 'UPDATE_QUANTITY': {
            if (action.payload.quantity <= 0) {
                const filteredItems = state.items.filter(item => item.product.id !== action.payload.id);
                return calculateTotals({ ...state, items: filteredItems });
            }
            
            const updatedItems = state.items.map(item =>
                item.product.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
            return calculateTotals({ ...state, items: updatedItems });
        }
        
        case 'CLEAR_CART':
            return { items: [], total: 0, itemCount: 0 };
        
        default:
            return state;
    }
};

const calculateTotals = (state: CartState): CartState => {
    const total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    return { ...state, total, itemCount };
};

const initialState: CartState = {
    items: [],
    total: 0,
    itemCount: 0
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addItem = (product: Product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    };

    const removeItem = (productId: number) => {
        dispatch({ type: 'REMOVE_ITEM', payload: productId });
    };

    const updateQuantity = (productId: number, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider value={{
            state,
            addItem,
            removeItem,
            updateQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};