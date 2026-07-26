'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types/product';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    try {
      const data = localStorage.getItem('cart');
      if (data) setCart(JSON.parse(data));
    } catch (e) {
      console.log('error al cargar');
    }
    setCargado(true);
  }, []);

  useEffect(() => {
    if (cargado) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, cargado]);

  const addToCart = (product: Product) => {
    setCart(c => {
      const existe = c.find(x => x.id === product.id);

      if (existe) {
        if (existe.quantity >= product.stock) return c;
        return c.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...c, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(c => c.filter(x => x.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(c =>
      c.map(item => {
        if (item.id === id) {
          let cant = quantity;
          if (cant > item.stock) cant = item.stock;
          return { ...item, quantity: cant };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  // sumar todo
  const totalItems = cart.reduce((acc, x) => acc + x.quantity, 0);
  const totalPrice = cart.reduce((acc, x) => acc + (x.price || 0) * x.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart no esta en el provider');
  return context;
};