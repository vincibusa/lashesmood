'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CiglissimeProduct } from '@/types/shopify';

interface CartItem {
  product: CiglissimeProduct;
  quantity: number;
  variantId: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: CiglissimeProduct; variantId: string } }
  | { type: 'REMOVE_ITEM'; payload: { variantId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { variantId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, variantId } = action.payload;
      const existingItem = state.items.find(item => item.variantId === variantId);

      let newItems;
      if (existingItem) {
        newItems = state.items.map(item =>
          item.variantId === variantId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { product, variantId, quantity: 1 }];
      }

      const total = newItems.reduce((sum, item) => {
        const price = parseFloat(item.product.priceRange.minVariantPrice.amount);
        return sum + (price * item.quantity);
      }, 0);

      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total,
        itemCount,
        isOpen: true, // Auto-open cart when item is added
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.variantId !== action.payload.variantId);
      
      const total = newItems.reduce((sum, item) => {
        const price = parseFloat(item.product.priceRange.minVariantPrice.amount);
        return sum + (price * item.quantity);
      }, 0);

      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total,
        itemCount,
      };
    }

    case 'UPDATE_QUANTITY': {
      const { variantId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { variantId } });
      }

      const newItems = state.items.map(item =>
        item.variantId === variantId
          ? { ...item, quantity }
          : item
      );

      const total = newItems.reduce((sum, item) => {
        const price = parseFloat(item.product.priceRange.minVariantPrice.amount);
        return sum + (price * item.quantity);
      }, 0);

      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total,
        itemCount,
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true,
      };

    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  total: 0,
  itemCount: 0,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ciglissime-cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        parsed.items.forEach((item: CartItem) => {
          dispatch({
            type: 'ADD_ITEM',
            payload: {
              product: item.product,
              variantId: item.variantId,
            },
          });
          // Update quantity if needed
          if (item.quantity > 1) {
            dispatch({
              type: 'UPDATE_QUANTITY',
              payload: {
                variantId: item.variantId,
                quantity: item.quantity,
              },
            });
          }
        });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ciglissime-cart', JSON.stringify({
      items: state.items,
      total: state.total,
      itemCount: state.itemCount,
    }));
  }, [state.items, state.total, state.itemCount]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Helper hooks
export function useCartActions() {
  const { dispatch } = useCart();

  return {
    addItem: (product: CiglissimeProduct, variantId: string = product.variants[0]?.id || '1') =>
      dispatch({ type: 'ADD_ITEM', payload: { product, variantId } }),
    removeItem: (variantId: string) =>
      dispatch({ type: 'REMOVE_ITEM', payload: { variantId } }),
    updateQuantity: (variantId: string, quantity: number) =>
      dispatch({ type: 'UPDATE_QUANTITY', payload: { variantId, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
    openCart: () => dispatch({ type: 'OPEN_CART' }),
    closeCart: () => dispatch({ type: 'CLOSE_CART' }),
  };
}