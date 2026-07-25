'use client';

import { useCart } from '@/context/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Carrito de compras</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-xl p-1"
          >
            X
          </button>
        </div>

        <div className="my-4 max-h-80 overflow-y-auto divide-y divide-gray-100">
          {cart.length === 0 ? (
            <p className="text-center py-8 text-gray-500 font-medium">
              El carrito esta vacio.
            </p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                  <p className="text-gray-500 text-xs">
                    ${(item.price || 0).toFixed(2)} c/u
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center text-sm font-bold text-gray-700"
                  >
                    -
                  </button>
                  <span className="text-sm font-semibold w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center text-sm font-bold text-gray-700"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium ml-2"
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-gray-800">Total:</span>
              <span className="text-2xl font-extrabold text-blue-600">
                ${(totalPrice || 0).toFixed(2)}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-xl transition-colors text-sm"
              >
                Vaciar
              </button>
              <button
                onClick={() => alert('Compra procesada')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition-colors text-sm"
              >
                Finalizar compra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}