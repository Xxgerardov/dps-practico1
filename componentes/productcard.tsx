'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, cart } = useCart();
  const [added, setAdded] = useState(false);

  // Calcular stock disponible
  const inCart = cart.find((i) => i.id === product.id)?.quantity || 0;
  const stockAvailable = product.stock - inCart;
  const noStock = stockAvailable <= 0;

  const handleAdd = () => {
    if (noStock) return;

    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 relative">
      
   
      {added && (
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg z-10 transition-all duration-300 animate-bounce">
          Agregado al carrito
        </div>
      )}

      <div>
        <div className="relative h-48 w-full bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="flex items-center justify-between my-3">
          <span className="text-2xl font-extrabold text-gray-900">
            ${(product.price || 0).toFixed(2)}
          </span>
          <span
            className={`text-xs font-semibold ${
              noStock ? 'text-red-500 font-bold' : 'text-gray-500'
            }`}
          >
            {noStock ? 'Sin stock' : `Disponibles: ${stockAvailable}`}
          </span>
        </div>

        <button
          onClick={handleAdd}
          disabled={noStock}
          className={`w-full font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-95 ${
            noStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed active:scale-100'
              : added
              ? 'bg-green-600 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {noStock ? 'Agotado' : added ? 'Listo' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  );
}