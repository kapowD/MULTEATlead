import React, { createContext, useContext, useEffect, useReducer, ReactNode } from "react"
import { Product } from "../types/product"

export type CartItemKey = number | string

export interface CartItem {
    product: Product
    quantity: number
}

interface CartState {
    items: CartItem[]
    total: number
    itemCount: number
}

type CartAction =
    | { type: "ADD_ITEM"; payload: Product }
    | { type: "REMOVE_ITEM"; payload: CartItemKey }
    | { type: "UPDATE_QUANTITY"; payload: { id: CartItemKey; quantity: number } }
    | { type: "CLEAR_CART" }
    | { type: "SET_ITEMS"; payload: CartItem[] } // <-- для гидратации/синхронизации

interface CartContextType {
    state: CartState
    addItem: (product: Product) => void
    removeItem: (productId: CartItemKey) => void
    updateQuantity: (productId: CartItemKey, quantity: number) => void
    clearCart: () => void
    hasItem: (productId: number) => boolean // есть в корзине?
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// ===== helpers =====
const STORAGE_KEY = "cart:v1"
export const getCartItemKey = (product: Product): string => product.cartKey ?? String(product.id)

const calculateTotals = (state: CartState): CartState => {
    const total = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
    return { ...state, total, itemCount }
}

const loadItems = (): CartItem[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return []
        const parsed = JSON.parse(raw) as { items?: CartItem[] }
        return Array.isArray(parsed.items) ? parsed.items : []
    } catch {
        return []
    }
}

// ===== reducer =====
const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case "ADD_ITEM": {
            const payloadKey = getCartItemKey(action.payload)
            const existing = state.items.find((i) => getCartItemKey(i.product) === payloadKey)
            const items = existing
                ? state.items.map((i) =>
                      getCartItemKey(i.product) === payloadKey
                          ? { ...i, quantity: i.quantity + 1 }
                          : i
                  )
                : [...state.items, { product: action.payload, quantity: 1 }]
            return calculateTotals({ ...state, items })
        }
        case "REMOVE_ITEM": {
            const itemKey = String(action.payload)
            const items = state.items.filter((i) => getCartItemKey(i.product) !== itemKey)
            return calculateTotals({ ...state, items })
        }
        case "UPDATE_QUANTITY": {
            const { id, quantity } = action.payload
            const itemKey = String(id)
            const items =
                quantity <= 0
                    ? state.items.filter((i) => getCartItemKey(i.product) !== itemKey)
                    : state.items.map((i) =>
                          getCartItemKey(i.product) === itemKey ? { ...i, quantity } : i
                      )
            return calculateTotals({ ...state, items })
        }
        case "CLEAR_CART":
            return { items: [], total: 0, itemCount: 0 }
        case "SET_ITEMS":
            return calculateTotals({ ...state, items: action.payload })
        default:
            return state
    }
}

const initialState: CartState = { items: [], total: 0, itemCount: 0 }

// ===== provider =====
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // при старте читаем localStorage
    const [state, dispatch] = useReducer(cartReducer, initialState, (init) =>
        calculateTotals({ ...init, items: loadItems() })
    )

    // при изменении items — сохраняем
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }))
    }, [state.items])

    // синхронизация между вкладками (можно удалить, если не нужно)
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY && e.newValue) {
                try {
                    const { items } = JSON.parse(e.newValue) as { items?: CartItem[] }
                    if (Array.isArray(items)) dispatch({ type: "SET_ITEMS", payload: items })
                } catch {}
            }
        }
        window.addEventListener("storage", onStorage)
        return () => window.removeEventListener("storage", onStorage)
    }, [])

    // api
    const addItem = (product: Product) => dispatch({ type: "ADD_ITEM", payload: product })
    const removeItem = (productId: CartItemKey) =>
        dispatch({ type: "REMOVE_ITEM", payload: productId })
    const updateQuantity = (productId: CartItemKey, quantity: number) =>
        dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } })
    const clearCart = () => dispatch({ type: "CLEAR_CART" })
    const hasItem = (productId: number) => state.items.some((i) => i.product.id === productId)

    return (
        <CartContext.Provider
            value={{ state, addItem, removeItem, updateQuantity, clearCart, hasItem }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error("useCart must be used within a CartProvider")
    return ctx
}
