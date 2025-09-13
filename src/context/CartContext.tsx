import React, { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';
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
  | { type: 'CLEAR_CART' }
  | { type: 'SET_ITEMS'; payload: CartItem[] }; // <-- для гидратации/синхронизации

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  hasItem: (productId: number) => boolean; // есть в корзине?
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// ===== helpers =====
const STORAGE_KEY = 'cart:v1';

const calculateTotals = (state: CartState): CartState => {
  const total = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  return { ...state, total, itemCount };
};

const loadItems = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { items?: CartItem[] };
    return Array.isArray(parsed.items) ? parsed.items : [];
  } catch {
    return [];
  }
};

// ===== reducer =====
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.product.id === action.payload.id);
      const items = existing
        ? state.items.map(i =>
            i.product.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { product: action.payload, quantity: 1 }];
      return calculateTotals({ ...state, items });
    }
    case 'REMOVE_ITEM': {
      const items = state.items.filter(i => i.product.id !== action.payload);
      return calculateTotals({ ...state, items });
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const items =
        quantity <= 0
          ? state.items.filter(i => i.product.id !== id)
          : state.items.map(i => (i.product.id === id ? { ...i, quantity } : i));
      return calculateTotals({ ...state, items });
    }
    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };
    case 'SET_ITEMS':
      return calculateTotals({ ...state, items: action.payload });
    default:
      return state;
  }
};

const initialState: CartState = { items: [], total: 0, itemCount: 0 };

// ===== provider =====
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // при старте читаем localStorage
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState,
    (init) => calculateTotals({ ...init, items: loadItems() })
  );

  // при изменении items — сохраняем
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
  }, [state.items]);

  // синхронизация между вкладками (можно удалить, если не нужно)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const { items } = JSON.parse(e.newValue) as { items?: CartItem[] };
          if (Array.isArray(items)) dispatch({ type: 'SET_ITEMS', payload: items });
        } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // api
  const addItem = (product: Product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeItem = (productId: number) => dispatch({ type: 'REMOVE_ITEM', payload: productId });
  const updateQuantity = (productId: number, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const hasItem = (productId: number) => state.items.some(i => i.product.id === productId);

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart, hasItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};
