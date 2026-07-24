'use client';

import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
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
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500 font-medium">
            Stock: {product.stock}
          </span>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 active:scale-95 transform"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}