'use client';

import { useCart } from '@/context/CartContext';

interface NavbarProps {
  onOpenCart: () => void;
}

export default function Navbar({ onOpenCart }: NavbarProps) {
  const { totalItems } = useCart();




  return (
    <nav className="bg-purple-700 border-b border-purple-800 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-white tracking-tight">
              MiTienda
            </span>
          </div>

          <button
            onClick={onOpenCart}
            className="relative bg-purple-800 hover:bg-purple-900 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2 border border-purple-600"
          >
            <span>Carrito</span>
            {totalItems > 0 && (
              <span className="bg-white text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">
                
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}